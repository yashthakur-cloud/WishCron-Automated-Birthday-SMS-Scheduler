import Link from "next/link";
import { Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#eadfda] bg-[#fffdf9]/85 px-5 py-8 backdrop-blur sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 text-sm text-[#746f86] sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link href="/" className="font-serif text-lg font-bold text-[#27233b]">WishCron</Link>
          <p className="mt-1 max-w-md leading-6">Thoughtful birthday reminders that help you stay close to the people who matter.</p>
          <a className="mt-3 inline-flex items-center gap-2 font-semibold text-[#d94d49] transition hover:text-[#8d83ce]" href="mailto:yashthakur11092005@gmail.com"><Mail size={15} /> yashthakur11092005@gmail.com</a>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <Link href="/login" className="font-semibold transition hover:text-[#d94d49]">Sign in</Link>
          <Link href="/register" className="font-semibold transition hover:text-[#d94d49]">Get started</Link>
          <a href="https://github.com/yashthakur-cloud/WishCron-Automated-Birthday-SMS-Scheduler" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-semibold transition hover:text-[#d94d49]"><Github size={16} /> GitHub</a>
          <p className="w-full font-semibold text-[#746f86] sm:w-auto">Made by - Yash Thakur</p>
        </div>
      </div>
    </footer>
  );
}
