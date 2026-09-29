# Family Devotion — setup on a new laptop

This edition uses a hosted Supabase database for shared schedules, members, songs, messages and homepage images. The included `supabase.sql` sets access rules. Nothing is published to your live site until you configure and deploy it.

## 1. Supabase

1. Create a free Supabase project at supabase.com, then open **SQL Editor**. Run the complete `supabase.sql` file.
2. Open **Authentication → Users → Add user** and create your admin with an email and a strong password. Copy its UUID (user ID).
3. In SQL Editor run `insert into public.admin_users(user_id) values ('PASTE-THE-UUID-HERE');`.
4. In **Project Settings → API Keys**, copy the project URL and the **publishable/anon key**. Never use a service_role/secret key in this frontend.
5. The SQL creates public read access for schedules, approved devotionals, songs and hero images. Registrations can be submitted publicly but only the admin can view phone numbers. Messages are moderated before publication. For a public website, enable Supabase CAPTCHA or other abuse controls when possible.

## 2. Local preview

Install Node.js and open this folder in a terminal. Copy `.env.example` to `.env.local` and insert the project URL and publishable/anon key. Run `npm install` and `npm run dev`.

Open the local URL, visit the **Admin** tab, sign in, add members and mark which are eligible for praise and worship. Add prayer items and songs. Select the people present and click **Generate and publish schedule**. Upload your own JPG/PNG/WebP photos (up to 5 MB) in the admin image section. Images rotate every five seconds. The site uses Africa/Nairobi for the daily scripture and Saturday date.

Members can use `#register` in the site URL to submit their full name and phone number; share that direct link. Their registration becomes a candidate member. Public devotional submissions require admin approval. You can download registrations as CSV and the public schedule and messages as PDF.

## 3. Netlify

Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under **Site configuration → Environment variables**. Build command: `npm run build`. Publish directory: `dist`. Redeploy after setting the variables. Push the revised project to the GitHub repository linked to your Netlify site (or test it in a separate branch/site first). Never commit `.env.local`.

## Notes

- This ZIP cannot restore old schedules that lived only in the lost laptop's browser local storage. Add the current roster and publish a new schedule.
- Song titles and official links are managed in Admin. Automatic scraping of contemporary songs is not included; that would need a legitimate licensed catalogue or authorized source. No full commercial song lyrics are bundled.
- The supplied scripture/reflection collection rotates by Nairobi calendar date. For a larger or editorially controlled daily series, add a dedicated content table in a later phase.
- An old hardcoded client-side admin password was removed. Change any password you reused from that version.
