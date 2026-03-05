# Supabase Setup for EduGuide

To enable authentication and database features, configure Supabase:

## 1. Create a Supabase project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Sign in or create an account
3. Click **New Project**
4. Choose an organization, name your project, set a password, and select a region
5. Click **Create new project** and wait for it to finish provisioning

## 2. Get your API credentials

1. In your project, go to **Project Settings** (gear icon) → **API**
2. Copy:
   - **Project URL** (e.g. `https://abcdefgh.supabase.co`)
   - **anon public** key (under "Project API keys")

## 3. Add to `.env.local`

Create or edit `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Replace with your actual Project URL and anon public key.

## 4. Restart the dev server

```bash
npm run dev
```

After this, "Supabase not configured" will no longer appear and auth will use your Supabase project.
