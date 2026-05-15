create extension if not exists "pgcrypto";

do $$
begin
  if not exists (select 1 from pg_type where typname = 'user_role') then
    create type public.user_role as enum ('masyarakat', 'petugas');
  end if;
end
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nama_lengkap text not null,
  email text not null,
  role public.user_role not null default 'masyarakat',
  created_at timestamp with time zone not null default now()
);

alter table public.profiles enable row level security;

create or replace function public.current_user_role()
returns public.user_role
language sql
stable
security definer
set search_path = public
as $$
  select role
  from public.profiles
  where id = (select auth.uid())
$$;

create or replace function public.is_petugas()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_user_role() = 'petugas'::public.user_role, false)
$$;

revoke all on function public.current_user_role() from public;
revoke all on function public.is_petugas() from public;
grant execute on function public.current_user_role() to authenticated;
grant execute on function public.is_petugas() to authenticated;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  insert into public.profiles (id, nama_lengkap, email, role)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data ->> 'nama_lengkap', ''), split_part(new.email, '@', 1)),
    new.email,
    'masyarakat'::public.user_role
  )
  on conflict (id) do update
  set
    nama_lengkap = excluded.nama_lengkap,
    email = excluded.email;

  return new;
end;
$$;

create or replace function public.handle_user_email_update()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  update public.profiles
  set email = new.email
  where id = new.id;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

drop trigger if exists on_auth_user_email_updated on auth.users;
create trigger on_auth_user_email_updated
after update of email on auth.users
for each row execute function public.handle_user_email_update();

drop policy if exists "Profiles are readable by owner" on public.profiles;
create policy "Profiles are readable by owner"
on public.profiles
for select
to authenticated
using ((select auth.uid()) = id);

drop policy if exists "Users can insert own masyarakat profile" on public.profiles;
create policy "Users can insert own masyarakat profile"
on public.profiles
for insert
to authenticated
with check (
  (select auth.uid()) = id
  and role = 'masyarakat'::public.user_role
  and email = (select auth.jwt() ->> 'email')
);

drop policy if exists "Users can update own basic profile" on public.profiles;
create policy "Users can update own basic profile"
on public.profiles
for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

revoke all on public.profiles from anon, authenticated;
grant select, insert on public.profiles to authenticated;
grant update (nama_lengkap) on public.profiles to authenticated;

create index if not exists profiles_role_idx
on public.profiles (role);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references auth.users(id) on delete cascade,
  reporter_name text not null,
  location_text text not null,
  waste_type text not null,
  urgency text not null,
  status text not null default 'menunggu',
  description text not null,
  image_path text,
  image_url text,
  latitude double precision,
  longitude double precision,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

alter table public.reports
add column if not exists reporter_id uuid references auth.users(id) on delete cascade;

alter table public.reports
add column if not exists image_path text;

alter table public.reports
add column if not exists image_url text;

alter table public.reports
add column if not exists updated_at timestamp with time zone not null default now();

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'reports_status_check'
      and conrelid = 'public.reports'::regclass
  ) then
    alter table public.reports
    add constraint reports_status_check
    check (status in ('menunggu', 'diproses', 'selesai'));
  end if;
end
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_reports_updated_at on public.reports;
create trigger set_reports_updated_at
before update on public.reports
for each row execute function public.set_updated_at();

alter table public.reports enable row level security;

drop policy if exists "Allow public insert reports" on public.reports;
drop policy if exists "Allow public select reports" on public.reports;
drop policy if exists "Allow public update reports" on public.reports;
drop policy if exists "Masyarakat can create own reports" on public.reports;
drop policy if exists "Masyarakat can read own reports and petugas can read all" on public.reports;
drop policy if exists "Petugas can update report status" on public.reports;
drop policy if exists "Masyarakat can delete own reports" on public.reports;

create policy "Masyarakat can create own reports"
on public.reports
for insert
to authenticated
with check (
  (select auth.uid()) = reporter_id
  and public.current_user_role() = 'masyarakat'::public.user_role
);

create policy "Masyarakat can read own reports and petugas can read all"
on public.reports
for select
to authenticated
using (
  (select auth.uid()) = reporter_id
  or public.is_petugas()
);

create policy "Petugas can update report status"
on public.reports
for update
to authenticated
using (public.is_petugas())
with check (public.is_petugas());

create policy "Masyarakat can delete own reports"
on public.reports
for delete
to authenticated
using (
  (select auth.uid()) = reporter_id
  or public.is_petugas()
);

revoke all on public.reports from anon, authenticated;
grant select, insert, delete on public.reports to authenticated;
grant update (status) on public.reports to authenticated;

create index if not exists reports_reporter_id_created_at_idx
on public.reports (reporter_id, created_at desc);

create index if not exists reports_status_created_at_idx
on public.reports (status, created_at desc);

insert into storage.buckets (id, name, public)
values ('report-images', 'report-images', false)
on conflict (id) do update set public = false;

drop policy if exists "Allow public upload report images" on storage.objects;
drop policy if exists "Allow public read report images" on storage.objects;
drop policy if exists "Authenticated users can upload own report images" on storage.objects;
drop policy if exists "Users can read allowed report images" on storage.objects;
drop policy if exists "Users can delete allowed report images" on storage.objects;

create policy "Authenticated users can upload own report images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'report-images'
  and (storage.foldername(name))[1] = 'reports'
  and (storage.foldername(name))[2] = (select auth.uid())::text
  and public.current_user_role() = 'masyarakat'::public.user_role
);

create policy "Users can read allowed report images"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'report-images'
  and (
    (storage.foldername(name))[2] = (select auth.uid())::text
    or public.is_petugas()
  )
);

create policy "Users can delete allowed report images"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'report-images'
  and (
    (storage.foldername(name))[2] = (select auth.uid())::text
    or public.is_petugas()
  )
);

grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on storage.objects to authenticated;
