# Family Devotion

A family prayer and devotional site with separate Home, Schedule, Songs, Devotionals, Registration and Admin tabs. Shared data is stored in Supabase. Start with [SETUP.md](SETUP.md) and run [supabase.sql](supabase.sql) in your Supabase project.

## Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

On Windows, copy `.env.example` to `.env.local` manually and edit the values. Production build: `npm run build`.
