"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase-client";

export default function Navbar({ userEmail }) {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/");
    router.refresh();
  }

  return (
    <header className="border-b border-[#eadfda] bg-[#fffdf9]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Go to WishCron home">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f06459] text-xl shadow-[0_5px_0_#d94d49]" aria-hidden="true">🎂</div>
          <div>
            <h1 className="font-serif text-lg font-bold tracking-tight text-[#27233b] sm:text-xl">Birthday wishes</h1>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8d83ce]">Textbee gateway</p>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden max-w-[220px] truncate text-sm text-[#746f86] md:inline" title={userEmail}>{userEmail}</span>
          <button type="button" onClick={handleLogout} className="rounded-full border border-[#eadfda] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#746f86] transition hover:border-[#f06459] hover:text-[#d94d49]">Log out</button>
        </div>
      </div>
    </header>
  );
}
