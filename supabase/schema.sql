-- Skema untuk Poles (Tahap 5). Jalankan di Supabase SQL Editor.

-- Profil pengguna
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  name text,
  created_at timestamptz not null default now()
);

-- Resume yang disimpan
create table if not exists public.resumes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  title text not null default 'Resume',
  story text,
  bullets jsonb not null default '[]'::jsonb,
  keywords jsonb not null default '[]'::jsonb,
  score integer not null default 0,
  tone text,
  language text,
  job_description text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.resumes enable row level security;

-- Trigger: buat profil otomatis saat user daftar
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, name)
  values (new.id, new.email, new.raw_user_meta_data->>'name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Policy: user hanya bisa melihat/mengubah datanya sendiri
create policy "Profil: lihat milik sendiri"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Profil: buat sendiri"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Resume: lihat milik sendiri"
  on public.resumes for select
  using (auth.uid() = user_id);

create policy "Resume: buat sendiri"
  on public.resumes for insert
  with check (auth.uid() = user_id);

create policy "Resume: ubah milik sendiri"
  on public.resumes for update
  using (auth.uid() = user_id);

create policy "Resume: hapus milik sendiri"
  on public.resumes for delete
  using (auth.uid() = user_id);