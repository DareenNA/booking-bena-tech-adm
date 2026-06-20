# BenaTech Backend Setup Guide (Supabase & Google Calendar)

This guide walks you through setting up Supabase, database tables, administrator users, and Google Calendar synchronization for the BenaTech booking system.

---

## Step 1: Run the Database Schema
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard) and select your project.
2. In the left sidebar, click **SQL Editor**.
3. Click **New Query**.
4. Copy the entire contents of [supabase_schema.sql](./supabase_schema.sql) and paste it into the editor.
5. Click **Run** (bottom right). This will create your tables (`available_slots`, `bookings`), set up security policies, and configure the automatic database triggers.

---

## Step 2: Create Admin Users
To allow you and your partner to log into the Admin Dashboard:
1. In the Supabase Dashboard, click **Authentication** (user icon).
2. Click **Users** -> **Add user** -> **Create user**.
3. Enter your email and password, then click **Create user**.
4. Repeat the process for your partner's email.
*Note: Make sure to check/confirm the email invitation if email confirmation is turned on, or disable "Confirm email" in Auth -> Providers -> Email if you want instant login.*

---

## Step 3: Configure Frontend Environment Variables
1. Create a `.env` file in the root of your project (you can duplicate [.env.example](./.env.example)).
2. Copy your **Project URL** and **Anon Key** from Supabase Dashboard:
   - Go to **Project Settings** (gear icon) -> **API**.
   - Copy **Project URL** and paste it as `VITE_SUPABASE_URL`.
   - Copy **API Key** (labeled `anon` / `public`) and paste it as `VITE_SUPABASE_ANON_KEY`.
3. Restart your local development server (`npm run dev`).

---

## Step 4: Setup Google Calendar API Credentials
To allow the backend to create events on your calendars, you need a Google Service Account:
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (e.g., "BenaTech Calendar Sync").
3. Go to **APIs & Services** -> **Library**, search for **Google Calendar API**, and click **Enable**.
4. Go to **APIs & Services** -> **Credentials**.
5. Click **Create Credentials** -> **Service Account**. Fill out a name and click **Create**.
6. Once created, click on the Service Account email.
7. Go to the **Keys** tab -> **Add Key** -> **Create new key** -> Select **JSON** -> Click **Create**. A file will download to your computer.
8. **Share your calendars:**
   - Open your Google Calendar.
   - Go to **Settings and sharing** for the calendar you want to sync.
   - Under **Share with specific people**, add the Service Account email (found in the JSON file under `client_email`).
   - Permissions MUST be set to: **Make changes to events**.
   - Do the same for your partner's calendar if you want them invited.

---

## Step 5: Deploy the Supabase Edge Function
To run the Deno Edge Function, you can install the Supabase CLI locally and deploy it:

1. Install Supabase CLI:
   ```powershell
   # On Windows (PowerShell):
   iwr -useb https://raw.githubusercontent.com/supabase/cli/main/install.ps1 | iex
   ```
2. Log in and initialize:
   ```bash
   supabase login
   supabase init
   ```
3. Set your Edge Function secrets in the Supabase Dashboard (or via CLI):
   - **`GOOGLE_SERVICE_ACCOUNT`**: The full content of your downloaded Google JSON credentials file.
     *Formatting command:*
     ```bash
     supabase secrets set GOOGLE_SERVICE_ACCOUNT='{"type": "service_account", ...}'
     ```
   - **`ADMIN_EMAIL_1`**: Your email (so you get calendar invites).
   - **`ADMIN_EMAIL_2`**: Your partner's email.
   - **`GOOGLE_CALENDAR_ID`**: The Calendar ID (usually `primary`, or your specific calendar email).
4. Deploy the function:
   ```bash
   supabase functions deploy sync-to-calendar --project-ref your-supabase-project-ref
   ```

---

## Step 6: Create the Database Webhook
Now trigger this function whenever a client books:
1. Go to your Supabase Dashboard -> **Database** (database cylinder icon).
2. Click **Webhooks** -> **Create Webhook**.
3. Configure the webhook:
   - **Name**: `sync-bookings-to-calendar`
   - **Table**: `bookings`
   - **Events**: Check `Insert`
   - **Type**: Select **Supabase Edge Function**
   - **Method**: `POST`
   - **Edge Function**: Select `sync-to-calendar`
4. Click **Save**.

Your backend, database, admin page, and calendar sync are now fully connected!
