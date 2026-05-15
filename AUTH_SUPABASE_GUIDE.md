# Panduan Setup Supabase Auth ResikIn

## Struktur Auth Baru

```text
src/
  app/
    auth-actions.js
    login/page.js
    (user)/user/login/page.js
    (user)/user/register/page.js
    (user)/user/dashboard/page.js
    (user)/user/history/page.js
    (user)/user/report/page.js
    (officer)/officer/login/page.js
    (officer)/officer/dashboard/page.js
    (officer)/officer/reports/page.js
    (officer)/officer/reports/[id]/page.js
  components/ui/
    auth-form-card.js
    logout-button.js
  lib/
    auth/
      constants.js
      errors.js
      session.js
    supabase/
      client.js
      config.js
      proxy.js
      server.js
    actions.js
    reports.js
    supabase.js
    validation.js
  proxy.js
supabase/
  setup.sql
```

## Package

Install package Supabase SSR:

```bash
npm install @supabase/ssr @supabase/supabase-js
```

Package ini sudah ditambahkan ke `package.json`.

## Environment

Isi `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxx
```

Jika project masih memakai legacy anon key, fallback ini juga didukung:

```env
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_legacy_anon_key
```

Jangan taruh `service_role` atau `sb_secret_xxx` di frontend, `.env.local`, atau Vercel variable yang diawali `NEXT_PUBLIC_`.

## Setup SQL Supabase

1. Buka Supabase Dashboard.
2. Pilih project.
3. Masuk ke `SQL Editor`.
4. Klik `New query`.
5. Paste seluruh isi `supabase/setup.sql`.
6. Klik `Run`.

SQL tersebut membuat:

- enum role `masyarakat` dan `petugas`
- tabel `public.profiles` yang terhubung ke `auth.users`
- trigger otomatis saat user register
- RLS profile agar user hanya membaca profil sendiri
- RLS report agar masyarakat hanya akses laporannya sendiri
- RLS petugas agar bisa membaca semua report dan update status
- bucket `report-images` privat
- policy storage untuk signed URL gambar laporan

## Membuat Akun Petugas Manual

1. Buka Supabase Dashboard.
2. Masuk ke `Authentication` -> `Users`.
3. Klik `Add user`.
4. Isi email dan password petugas.
5. Aktifkan `Auto Confirm User` jika tersedia.
6. Simpan user.
7. Buka `Table Editor` -> `profiles`.
8. Cari email petugas.
9. Ubah:

```text
nama_lengkap = Nama Petugas
role = petugas
```

Alternatif lewat SQL Editor:

```sql
update public.profiles
set nama_lengkap = 'Nama Petugas',
    role = 'petugas'
where email = 'petugas@example.com';
```

Akun petugas tidak memiliki halaman register frontend.

## Testing Auth

1. Jalankan app:

```bash
npm run dev
```

2. Buka `/user/register`.
3. Register akun masyarakat dengan nama lengkap, email, dan password minimal 8 karakter berisi huruf dan angka.
4. Setelah berhasil, app redirect ke `/user/login?registered=1`.
5. Login dengan akun masyarakat.
6. Pastikan redirect ke `/user/dashboard`.
7. Cek Supabase `Table Editor` -> `profiles`; role harus `masyarakat`.
8. Login sebagai petugas yang dibuat manual.
9. Pastikan redirect ke `/officer/dashboard`.

## Testing Role Protection

1. Logout.
2. Buka `/user/dashboard`; harus redirect ke `/login`.
3. Login sebagai masyarakat, lalu buka `/officer/dashboard`; harus redirect ke `/unauthorized`.
4. Login sebagai petugas, lalu buka `/user/dashboard`; harus redirect ke `/unauthorized`.
5. Buat laporan sebagai masyarakat.
6. Masyarakat hanya melihat laporannya sendiri di dashboard/history.
7. Petugas bisa melihat semua laporan di dashboard/report list.
8. Petugas bisa mengubah status laporan.

## Deploy Aman

1. Jalankan SQL `supabase/setup.sql` di project Supabase production.
2. Di Vercel, isi environment:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxx
```

3. Jangan deploy `service_role` ke client.
4. Buka Supabase `Authentication` -> `URL Configuration`.
5. Isi `Site URL` dengan domain production.
6. Tambahkan redirect URL local dan production bila memakai email confirmation.
7. Deploy.
8. Test register masyarakat, login masyarakat, login petugas, dan akses silang role.

## File Lama yang Dihapus

```text
src/lib/auth-config.js
src/lib/dummy-data.js
```

Sistem cookie dummy `session`/`role` sudah diganti dengan session cookie Supabase dari `@supabase/ssr`.
