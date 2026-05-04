create extension if not exists "pgcrypto";

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_name text not null,
  location_text text not null,
  waste_type text not null,
  urgency text not null,
  status text not null default 'menunggu',
  description text not null,
  image_url text,
  latitude float8,
  longitude float8,
  created_at timestamp with time zone not null default now()
);

alter table public.reports
add column if not exists status text not null default 'menunggu';

alter table public.reports enable row level security;

drop policy if exists "Allow public insert reports" on public.reports;
create policy "Allow public insert reports"
on public.reports
for insert
to public
with check (true);

drop policy if exists "Allow public select reports" on public.reports;
create policy "Allow public select reports"
on public.reports
for select
to public
using (true);

grant usage on schema public to anon, authenticated;
grant select, insert, update on public.reports to anon, authenticated;

drop policy if exists "Allow public update reports" on public.reports;
create policy "Allow public update reports"
on public.reports
for update
to public
using (true)
with check (true);

insert into storage.buckets (id, name, public)
values ('report-images', 'report-images', true)
on conflict (id) do update set public = true;

update storage.buckets
set public = true
where id = 'report-images';

drop policy if exists "Allow public upload report images" on storage.objects;
create policy "Allow public upload report images"
on storage.objects
for insert
to public
with check (bucket_id = 'report-images');

drop policy if exists "Allow public read report images" on storage.objects;
create policy "Allow public read report images"
on storage.objects
for select
to public
using (bucket_id = 'report-images');

grant select, insert on storage.objects to anon, authenticated;
