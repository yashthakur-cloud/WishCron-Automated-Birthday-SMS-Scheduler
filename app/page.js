import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "../lib/supabase-server";

const features = [
  ["08:00", "Automated 8 AM cron dispatch", "Every wish is queued for the moment your people start their special day."],
  ["Aa", "Personalized custom wishes", "Write something that sounds like you, with a thoughtful fallback when you are busy."],
  ["SMS", "Direct cellular delivery", "Your connected Android gateway sends the message straight to the recipient."],
];

export default async function LandingPage() {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) redirect("/dashboard");

  return (
    <main className="min-h-screen overflow-hidden">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f06459] text-xl shadow-[0_5px_0_#d94d49]" aria-hidden="true">🎂</span>
          <span>
            <span className="block font-serif text-lg font-bold text-[#27233b]">WishCron</span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8d83ce]">Birthday automation</span>
          </span>
        </Link>
        <Link href="/login" className="rounded-full border border-[#eadfda] bg-[#fffdf9] px-4 py-2 text-sm font-bold text-[#4e485e] transition hover:border-[#f06459] hover:text-[#d94d49]">Sign in</Link>
      </header>

      <section className="birthday-shell mx-auto max-w-6xl px-5 pb-16 pt-12 sm:px-8 sm:pt-20">
        <div className="relative max-w-3xl">
          <p className="rise-in mb-5 text-sm font-bold uppercase tracking-[0.22em] text-[#d94d49]">For the people worth remembering</p>
          <h1 className="rise-in max-w-3xl font-serif text-5xl font-bold leading-[0.98] tracking-tight text-[#27233b] sm:text-7xl">Never Miss A <span className="text-[#d94d49]">Birthday</span> Again.</h1>
          <p className="rise-in mt-7 max-w-2xl text-lg leading-8 text-[#746f86]">Schedule personalized birthday wishes once. WishCron automatically dispatches them via direct SMS on their special day—100% free.</p>
          <div className="rise-in mt-9 flex flex-col gap-4 sm:flex-row">
            <Link href="/register" className="inline-flex items-center justify-center rounded-xl bg-[#f06459] px-6 py-4 text-sm font-bold text-white shadow-[0_5px_0_#d94d49] transition hover:-translate-y-0.5 hover:bg-[#e85a53]">Get Started Free <span className="ml-2 text-lg" aria-hidden="true">→</span></Link>
            <Link href="/login" className="inline-flex items-center justify-center rounded-xl border border-[#eadfda] bg-[#fffdf9] px-6 py-4 text-sm font-bold text-[#4e485e] transition hover:border-[#8d83ce] hover:text-[#665bb8]">Sign In</Link>
          </div>
        </div>
        <div className="pointer-events-none absolute right-[8%] top-44 hidden text-8xl opacity-80 lg:block" aria-hidden="true">🎈</div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {features.map(([eyebrow, title, description]) => (
            <article key={title} className="rounded-[22px] border border-[#eadfda] bg-[#fffdf9] p-6 shadow-[0_12px_30px_rgba(61,43,74,0.05)]">
              <p className="font-serif text-2xl font-bold text-[#8d83ce]">{eyebrow}</p>
              <h2 className="mt-6 font-serif text-xl font-bold text-[#27233b]">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#746f86]">{description}</p>
            </article>
          ))}
        </div>
      </section>

    </main>
  );
}
