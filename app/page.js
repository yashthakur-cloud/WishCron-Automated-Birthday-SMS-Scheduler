import Link from "next/link";
import { ArrowRight, Check, Clock3, MessageSquare, Sparkles } from "lucide-react";
import LandingMockup from "../components/LandingMockup";
import { createSupabaseServerClient } from "../lib/supabase-server";

const features = [
  {
    icon: Clock3,
    color: "bg-[#eee9ff] text-[#665bb8]",
    title: "Automated 8 AM cron dispatch",
    description: "Every wish is queued for the moment your people start their special day.",
  },
  {
    icon: Sparkles,
    color: "bg-[#fff3c8] text-[#80651d]",
    title: "Personalized custom wishes",
    description: "Write something that sounds like you, with a thoughtful fallback when you are busy.",
  },
  {
    icon: MessageSquare,
    color: "bg-[#e5f4ea] text-[#327052]",
    title: "Direct cellular SMS delivery",
    description: "Your connected Android gateway sends the message straight to the recipient.",
  },
];

const steps = [
  ["01", "Add contacts", "Save a name, number, birthday, and the message you want them to receive."],
  ["02", "Connect gateway", "Pair your Textbee Android gateway once and keep it ready for delivery."],
  ["03", "Automate wishes", "WishCron checks every morning and sends each birthday wish right on time."],
];

const faqs = [
  ["Is it really free?", "Yes. WishCron is free to use. You only need a connected Textbee Android gateway to deliver the SMS from your own device."],
  ["How does SMS delivery work?", "WishCron checks your saved birthdays every day at 8:00 AM IST, then sends the message through your connected cellular gateway."],
  ["Can I edit custom wishes?", "Yes. Every contact can have its own custom message, and you can update the saved details from your dashboard."],
  ["Will a birthday message ever send twice?", "No. WishCron records the year after a successful delivery and skips that birthday for the rest of the same year."],
  ["Can I send wishes to international numbers?", "Yes. Choose the recipient's country when you add a contact. WishCron adds the correct country calling code before sending."],
];

export default async function LandingPage() {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen overflow-hidden">
      <header className="sticky top-0 z-50 border-b border-[#eadfda]/80 bg-[#fffaf3]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f06459] text-xl shadow-[0_5px_0_#d94d49]" aria-hidden="true">🎂</span>
            <span>
              <span className="block font-serif text-lg font-bold text-[#27233b]">WishCron</span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8d83ce]">Birthday automation</span>
            </span>
          </Link>
          <nav className="flex items-center gap-3 sm:gap-6" aria-label="Main navigation">
            <a href="#how-it-works" className="hidden text-sm font-bold text-[#746f86] transition hover:text-[#d94d49] sm:inline">How it works</a>
            <a href="#faq" className="hidden text-sm font-bold text-[#746f86] transition hover:text-[#d94d49] sm:inline">FAQ</a>
            <Link href={user ? "/dashboard" : "/login"} className="rounded-full border border-[#eadfda] bg-[#fffdf9] px-4 py-2 text-sm font-bold text-[#4e485e] transition hover:border-[#f06459] hover:text-[#d94d49]">{user ? "Dashboard" : "Sign in"}</Link>
          </nav>
        </div>
      </header>

      <section className="birthday-shell mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-8 sm:pb-28 sm:pt-20 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 lg:pt-28">
        <div className="relative z-10">
          <p className="rise-in mb-5 text-sm font-bold uppercase tracking-[0.22em] text-[#d94d49]">For the people worth remembering</p>
          <h1 className="rise-in max-w-3xl font-serif text-5xl font-bold leading-[0.98] tracking-tight text-[#27233b] sm:text-7xl">Never Miss A <span className="text-[#d94d49]">Birthday</span> Again.</h1>
          <p className="rise-in mt-7 max-w-xl text-lg leading-8 text-[#746f86]">Schedule personalized birthday wishes once. WishCron automatically dispatches them via direct SMS on their special day—100% free.</p>
          <div className="rise-in mt-9 flex flex-col gap-4 sm:flex-row">
            <Link href={user ? "/dashboard" : "/register"} className="inline-flex items-center justify-center rounded-xl bg-[#f06459] px-6 py-4 text-sm font-bold text-white shadow-[0_5px_0_#d94d49] transition hover:-translate-y-0.5 hover:bg-[#e85a53]">{user ? "Open Dashboard" : "Get Started Free"} <ArrowRight size={17} className="ml-2" /></Link>
            <Link href={user ? "/dashboard" : "/login"} className="inline-flex items-center justify-center rounded-xl border border-[#eadfda] bg-[#fffdf9] px-6 py-4 text-sm font-bold text-[#4e485e] transition hover:border-[#8d83ce] hover:text-[#665bb8]">{user ? "Manage Wishes" : "Sign In"}</Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-[#746f86]">
            <span className="flex items-center gap-1.5"><Check size={14} className="text-[#327052]" /> No credit card</span>
            <span className="flex items-center gap-1.5"><Check size={14} className="text-[#327052]" /> Your own gateway</span>
            <span className="flex items-center gap-1.5"><Check size={14} className="text-[#327052]" /> Private by design</span>
          </div>
        </div>
        <div className="rise-in-delay mt-14 lg:mt-0"><LandingMockup /></div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <div className="mb-9 max-w-xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#8d83ce]">The thoughtful shortcut</p>
          <h2 className="font-serif text-3xl font-bold leading-tight text-[#27233b] sm:text-4xl">Small setup. Big feeling.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {features.map(({ icon: Icon, color, title, description }) => (
            <article key={title} className="rounded-[22px] border border-[#eadfda] bg-[#fffdf9] p-6 shadow-[0_12px_30px_rgba(61,43,74,0.05)] transition hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(61,43,74,0.1)]">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${color}`}><Icon size={22} /></div>
              <h3 className="mt-6 font-serif text-xl font-bold text-[#27233b]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#746f86]">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="border-y border-[#eadfda] bg-[#fff7e3] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#d94d49]">How it works</p>
            <h2 className="font-serif text-3xl font-bold leading-tight text-[#27233b] sm:text-4xl">Set it once. Stay thoughtful all year.</h2>
          </div>
          <div className="grid gap-10 md:grid-cols-3 md:gap-6">
            {steps.map(([number, title, description], index) => (
              <div key={title} className="relative">
                {index < steps.length - 1 && <div className="absolute left-11 top-6 hidden h-px w-[calc(100%-28px)] bg-[#e5cfae] md:block" aria-hidden="true" />}
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#27233b] font-bold text-white shadow-[0_4px_0_#8d83ce]">{number}</div>
                <h3 className="mt-6 font-serif text-2xl font-bold text-[#27233b]">{title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-6 text-[#746f86]">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#8d83ce]">Good to know</p>
          <h2 className="font-serif text-3xl font-bold text-[#27233b] sm:text-4xl">Questions, answered.</h2>
        </div>
        <div className="space-y-3">
          {faqs.map(([question, answer]) => (
            <details key={question} className="group rounded-2xl border border-[#eadfda] bg-[#fffdf9] px-5 py-4 shadow-[0_8px_20px_rgba(61,43,74,0.04)]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-serif text-lg font-bold text-[#27233b] [&::-webkit-details-marker]:hidden">
                {question}
                <span className="text-2xl font-normal text-[#8d83ce] transition group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="max-w-2xl pt-3 text-sm leading-6 text-[#746f86]">{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
