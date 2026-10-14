# 🎂 WishCron

### Never miss a birthday again.

WishCron is a thoughtful birthday reminder and SMS automation app built for people who want to make every birthday feel remembered. Save important contacts once, personalize each message, and let WishCron deliver birthday wishes automatically through a connected Android phone.

<p align="center">
  <strong>✨ Personal wishes · 🔐 Secure accounts · 📱 Automatic SMS</strong>
</p>

---

## 🌟 What it does

- **Create an account** with email and password authentication.
- **Add birthday contacts** with names, phone numbers, birthdays, and optional custom messages.
- **Keep contacts private** with Supabase authentication and row-level security.
- **Send personalized birthday SMS messages** through a connected TextBee Android gateway.
- **Prevent duplicate birthday messages** by tracking the year a message was last sent.
- **Use a responsive dashboard** that works beautifully on desktop and mobile.

## 🛠️ Built with

<p>
  <img src="https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 14" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=20232A" alt="React 18" />
  <img src="https://img.shields.io/badge/Supabase-Auth%20%26%20Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

- **Next.js App Router** for the application and API routes
- **Supabase** for authentication and PostgreSQL data storage
- **TextBee** for SMS delivery through an Android device
- **Lucide React** for interface icons

## 📁 Project structure

```text
.
├── app/
│   ├── api/
│   │   ├── contacts/          # Authenticated contact CRUD endpoints
│   │   └── check-birthdays/   # Birthday SMS processing endpoint
│   ├── auth/callback/         # Email confirmation callback
│   ├── dashboard/             # Authenticated workspace
│   ├── login/                 # Sign-in page
│   └── register/              # Account creation page
├── components/                # Reusable UI components
├── lib/                       # Supabase clients and shared utilities
├── supabase/schema.sql        # Database schema and RLS policies
├── .env.local.example         # Local configuration template
└── package.json
```

## 🚀 Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 18.17 or newer
- A [Supabase](https://supabase.com/) project
- A [TextBee](https://textbee.dev/) account and connected Android device for SMS delivery

### 1. Clone the repository

```bash
git clone https://github.com/yashthakur-cloud/WishCron-Automated-Birthday-SMS-Scheduler.git
cd WishCron-Automated-Birthday-SMS-Scheduler
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure local services

Create your local environment file from the provided template:

```bash
copy .env.local.example .env.local
```

Then fill in the values privately using your Supabase and TextBee project settings. **Never commit `.env.local` or share credentials publicly.** The repository ignores local environment files by default.

### 4. Set up the database

Open the Supabase SQL Editor, paste the contents of [`supabase/schema.sql`](./supabase/schema.sql), and run it. This creates the contacts table, indexes, and row-level security policies.

In your Supabase Authentication settings, configure the site URL and email redirect URL to match your local or deployed application URL, including:

```text
/auth/callback
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📨 How automatic sending works

The birthday processing route checks the current date in the **Asia/Kolkata** timezone and finds contacts whose birthday matches that date. It then:

1. Builds the custom message, or uses WishCron’s default birthday message.
2. Sends the SMS through the TextBee gateway.
3. Records the current year after a successful send.
4. Skips contacts that have already received their birthday message this year.

The endpoint is protected by a private bearer secret. Configure your scheduler or cron provider to make a `GET` request to:

```text
/api/check-birthdays
```

with the configured authorization header. Keep the endpoint secret and schedule it to run once per day.

## 🔒 Security notes

- Keep all local configuration and credentials outside version control.
- Do not expose server-only credentials in client-side code.
- Supabase row-level security ensures users can only access their own contacts.
- Use a long, randomly generated secret for scheduled birthday processing.
- Rotate credentials immediately if they are ever exposed.

## 📜 Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm start` | Run the production server |
| `npm run lint` | Run the Next.js linter |

## ☁️ Deployment

WishCron can be deployed to any platform that supports Next.js, such as [Vercel](https://vercel.com/). Before going live:

- Add the private configuration values in the hosting provider’s environment settings.
- Update Supabase’s allowed site and redirect URLs.
- Run the SQL schema against the production Supabase project.
- Configure a daily cron job for the birthday processing endpoint.
- Confirm that the connected TextBee Android device is online and ready to send.

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes and run the available checks.
4. Open a pull request with a clear description.

## 📄 License

This project does not currently include a license. Please contact the repository owner before redistributing or using it commercially.

---


