"use client";

import { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";

export default function HomePage() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadContacts = useCallback(async () => {
    const response = await fetch("/api/contacts", { cache: "no-store" });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Unable to load contacts.");
    }
    setContacts(result.contacts);
  }, []);

  useEffect(() => {
    loadContacts().catch(() => setContacts([])).finally(() => setIsLoading(false));
  }, [loadContacts]);

  return (
    <>
      <Navbar />
      <main className="birthday-shell mx-auto min-h-[calc(100vh-81px)] max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="rise-in mb-9 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#d94d49]">Your birthday desk</p>
            <h2 className="max-w-2xl font-serif text-4xl font-bold leading-tight tracking-tight text-[#27233b] sm:text-5xl">Make every birthday feel <span className="text-[#d94d49]">remembered.</span></h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#746f86]">Save the people you love once. Your connected Android phone will deliver a personal birthday SMS right on time.</p>
          </div>
          <div className="flex w-fit items-center gap-3 rounded-2xl border border-[#eadfda] bg-[#fffdf9] px-4 py-3 shadow-[0_8px_24px_rgba(61,43,74,0.06)]">
            <span className="text-2xl" aria-hidden="true">🎈</span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#8d83ce]">Saved wishes</p>
              <p className="font-serif text-2xl font-bold text-[#27233b]">{contacts.length}</p>
            </div>
          </div>
        </div>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,390px)_1fr]">
          <ContactForm onContactAdded={loadContacts} />
          <ContactList contacts={contacts} isLoading={isLoading} onContactDeleted={loadContacts} />
        </div>
      </main>
    </>
  );
}
