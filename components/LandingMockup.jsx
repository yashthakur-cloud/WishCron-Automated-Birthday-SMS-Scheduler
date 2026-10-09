"use client";

import { useState } from "react";
import { Bell, Check, ChevronRight, Clock3, MessageSquare, Sparkles } from "lucide-react";

export default function LandingMockup() {
  const [isQueued, setIsQueued] = useState(true);

  return (
    <div className="relative mx-auto w-full max-w-[510px] lg:mr-0">
      <div className="absolute -right-4 -top-5 rounded-full bg-[#fff3c8] px-4 py-2 text-xs font-bold text-[#80651d] shadow-sm sm:-right-7">A little magic, scheduled ✨</div>
      <div className="rounded-[28px] border border-white/80 bg-[#27233b] p-2 shadow-[0_24px_70px_rgba(61,43,74,0.24)]">
        <div className="overflow-hidden rounded-[21px] bg-[#fffdf9]">
          <div className="flex items-center justify-between border-b border-[#eee5df] px-5 py-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f06459] text-sm">🎂</span>
              <div>
                <p className="font-serif text-sm font-bold text-[#27233b]">WishCron</p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8d83ce]">Your birthday desk</p>
              </div>
            </div>
            <span className="rounded-full bg-[#e5f4ea] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#327052]">Live</span>
          </div>
          <div className="space-y-4 bg-[#fffaf3] p-5 sm:p-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#d94d49]">Next up</p>
                <h3 className="mt-1 font-serif text-2xl font-bold text-[#27233b]">A thoughtful hello</h3>
              </div>
              <span className="rounded-xl bg-[#eee9ff] p-2 text-[#665bb8]"><Bell size={17} /></span>
            </div>
            <div className="rounded-2xl border border-[#eadfda] bg-[#fffdf9] p-4 shadow-[0_10px_24px_rgba(61,43,74,0.05)]">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f9d7cf] font-serif font-bold text-[#c74646]">RS</div>
                  <div>
                    <p className="font-bold text-[#27233b]">Rahul Sharma</p>
                    <p className="text-xs text-[#746f86]">DOB: Oct 12 · +91 98765 43210</p>
                  </div>
                </div>
                <ChevronRight size={17} className="text-[#aaa2b1]" />
              </div>
              <div className="mt-4 rounded-xl bg-[#fff7e3] p-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#80651d]"><MessageSquare size={14} /> Custom wish</div>
                <p className="mt-2 text-sm leading-5 text-[#4e485e]">“Wishing you a very Happy Birthday Rahul! Hope your day is filled with lots of joy...”</p>
              </div>
              <button type="button" onClick={() => setIsQueued((current) => !current)} className={`mt-4 flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-bold transition ${isQueued ? "bg-[#e5f4ea] text-[#327052]" : "bg-[#eee9ff] text-[#665bb8]"}`}>
                <span className="flex items-center gap-2"><Clock3 size={14} /> {isQueued ? "Queued for 8:00 AM IST" : "Paused until you are ready"}</span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/70">{isQueued ? <Check size={12} /> : "·"}</span>
              </button>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-dashed border-[#d9cce9] bg-[#eee9ff]/50 px-3 py-3">
              <span className="flex items-center gap-2 text-xs font-bold text-[#665bb8]"><Sparkles size={14} /> 12 wishes ready this month</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8d83ce]">Preview</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
