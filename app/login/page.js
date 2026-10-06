"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase-client";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const { error: signInError } = await supabase.auth.signInWithPassword(form);
    if (signInError) {
      setError(signInError.message);
      setIsSubmitting(false);
      return;
    }

    router.replace("/dashboard");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <section className="w-full max-w-md rounded-[26px] border border-[#eadfda] bg-[#fffdf9] p-7 shadow-[0_18px_45px_rgba(61,43,74,0.08)] sm:p-9">
        <Link href="/" className="text-sm font-bold text-[#8d83ce]">← WishCron</Link>
        <div className="mt-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d94d49]">Welcome back</p>
          <h1 className="mt-2 font-serif text-4xl font-bold text-[#27233b]">Sign in</h1>
          <p className="mt-3 text-sm leading-6 text-[#746f86]">Your birthday wishes are waiting.</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block text-sm font-bold text-[#4e485e]">
            Email
            <input className="mt-2 w-full rounded-xl border border-[#e3d9d4] bg-[#fffdf9] px-3.5 py-3 text-sm outline-none focus:border-[#8d83ce] focus:ring-4 focus:ring-[#eee9ff]" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
          </label>
          <label className="block text-sm font-bold text-[#4e485e]">
            Password
            <input className="mt-2 w-full rounded-xl border border-[#e3d9d4] bg-[#fffdf9] px-3.5 py-3 text-sm outline-none focus:border-[#8d83ce] focus:ring-4 focus:ring-[#eee9ff]" type="password" minLength="6" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required />
          </label>
          {error && <p className="rounded-xl bg-[#fff0ed] px-3 py-2 text-sm font-semibold text-[#c74646]">{error}</p>}
          <button className="w-full rounded-xl bg-[#f06459] px-4 py-3.5 text-sm font-bold text-white shadow-[0_5px_0_#d94d49] disabled:opacity-60" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="mt-7 text-center text-sm text-[#746f86]">New to WishCron? <Link href="/register" className="font-bold text-[#d94d49]">Create an account</Link></p>
      </section>
    </main>
  );
}
