-- Run in the Supabase SQL editor. Create an email/password user in Authentication,
-- then add its UUID to admin_users at the end of this file.
create table if not exists public.admin_users (user_id uuid primary key references auth.users(id) on delete cascade);
create or replace function public.is_devotional_admin() returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from public.admin_users where user_id = (select auth.uid()));
$$;
revoke all on function public.is_devotional_admin() from public;
grant execute on function public.is_devotional_admin() to anon, authenticated;
create table if not exists public.members (
 id bigint generated always as identity primary key, full_name text not null check(char_length(trim(full_name)) between 2 and 100),
 phone text not null check(phone ~ '^\+?[0-9 ()-]{7,20}$'), eligible_praise boolean not null default false,
 eligible_worship boolean not null default false, created_at timestamptz not null default now()
);
create table if not exists public.prayer_items (id bigint generated always as identity primary key, item text not null check(char_length(trim(item)) between 2 and 250));
create table if not exists public.schedules (
 meeting_date date primary key, assignments jsonb not null, prayers jsonb not null default '[]'::jsonb,
 songs jsonb not null default '[]'::jsonb, published_at timestamptz not null default now()
);
create table if not exists public.songs (
 id bigint generated always as identity primary key, title text not null, artist text not null default '', category text not null check(category in ('praise','worship')),
 link text not null default '', is_featured boolean not null default true
);
create table if not exists public.devotionals (
 id bigint generated always as identity primary key, title text not null check(char_length(trim(title)) between 2 and 150),
 body text not null check(char_length(trim(body)) between 10 and 10000), author text not null check(char_length(trim(author)) between 2 and 100),
 approved boolean not null default false, created_at timestamptz not null default now()
);
create table if not exists public.hero_images (
 id bigint generated always as identity primary key, image_url text not null, created_at timestamptz not null default now()
);
alter table public.admin_users enable row level security;
alter table public.members enable row level security;
alter table public.prayer_items enable row level security;
alter table public.schedules enable row level security;
alter table public.songs enable row level security;
alter table public.devotionals enable row level security;
alter table public.hero_images enable row level security;
create policy "admin own record" on public.admin_users for select to authenticated using(user_id = (select auth.uid()));
create policy "public member registration" on public.members for insert to anon, authenticated with check (eligible_praise = false and eligible_worship = false);
create policy "admin reads members" on public.members for select to authenticated using(public.is_devotional_admin());
create policy "admin edits members" on public.members for update to authenticated using(public.is_devotional_admin()) with check(public.is_devotional_admin());
create policy "admin deletes members" on public.members for delete to authenticated using(public.is_devotional_admin());
create policy "public reads prayer items" on public.prayer_items for select to anon, authenticated using(true);
create policy "admin adds prayer items" on public.prayer_items for insert to authenticated with check(public.is_devotional_admin());
create policy "admin deletes prayer items" on public.prayer_items for delete to authenticated using(public.is_devotional_admin());
create policy "public reads schedules" on public.schedules for select to anon, authenticated using(true);
create policy "admin publishes schedules" on public.schedules for insert to authenticated with check(public.is_devotional_admin());
create policy "admin updates schedules" on public.schedules for update to authenticated using(public.is_devotional_admin()) with check(public.is_devotional_admin());
create policy "public reads songs" on public.songs for select to anon, authenticated using(true);
create policy "admin adds songs" on public.songs for insert to authenticated with check(public.is_devotional_admin());
create policy "admin deletes songs" on public.songs for delete to authenticated using(public.is_devotional_admin());
create policy "public reads approved devotionals" on public.devotionals for select to anon, authenticated using(approved or public.is_devotional_admin());
create policy "public submits devotionals" on public.devotionals for insert to anon, authenticated with check(approved = false);
create policy "admin approves devotionals" on public.devotionals for update to authenticated using(public.is_devotional_admin()) with check(public.is_devotional_admin());
create policy "admin deletes devotionals" on public.devotionals for delete to authenticated using(public.is_devotional_admin());
create policy "public reads hero images" on public.hero_images for select to anon, authenticated using(true);
create policy "admin adds hero images" on public.hero_images for insert to authenticated with check(public.is_devotional_admin());
create policy "admin deletes hero images" on public.hero_images for delete to authenticated using(public.is_devotional_admin());
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('devotional-hero','devotional-hero',true,5242880,array['image/jpeg','image/png','image/webp']) on conflict(id) do nothing;
create policy "public hero downloads" on storage.objects for select to anon, authenticated using(bucket_id='devotional-hero');
create policy "admin hero uploads" on storage.objects for insert to authenticated with check(bucket_id='devotional-hero' and public.is_devotional_admin());
-- After creating YOUR admin in Authentication > Users, run separately:
-- insert into public.admin_users(user_id) values ('YOUR-ADMIN-USER-UUID');
