"use client";

import { Trash2 } from "lucide-react";

export default function ContactList({ contacts, isLoading, onContactDeleted }) {
  async function deleteContact(id) {
    if (!window.confirm("Delete this birthday contact?")) return;

    const response = await fetch(`/api/contacts/${id}`, { method: "DELETE" });
    const result = await response.json();
    if (!response.ok) {
      window.alert(result.error || "Unable to delete contact.");
      return;
    }
    await onContactDeleted();
  }

  return (
    <section className="rise-in-delay overflow-hidden rounded-[26px] border border-[#eadfda] bg-[#fffdf9] shadow-[0_18px_45px_rgba(61,43,74,0.08)]">
      <div className="flex items-end justify-between border-b border-dashed border-[#eadfda] px-6 py-6 sm:px-7">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-[#8d83ce]">Your little black book</p>
          <h2 className="font-serif text-2xl font-bold text-[#27233b]">Saved birthdays</h2>
          <p className="mt-1 text-sm text-[#746f86]">Your automated SMS recipients.</p>
        </div>
        <span className="hidden text-2xl sm:block" aria-hidden="true">🎁</span>
      </div>
      {isLoading ? (
        <p className="px-6 py-14 text-center text-sm font-semibold text-[#746f86]">Loading contacts...</p>
      ) : contacts.length === 0 ? (
        <div className="px-6 py-14 text-center">
          <div className="mb-3 text-4xl" aria-hidden="true">🍰</div>
          <p className="font-serif text-lg font-bold text-[#27233b]">Your list is waiting</p>
          <p className="mt-1 text-sm text-[#746f86]">Add a birthday and make someone&apos;s day.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-[#fff7e3] text-xs uppercase tracking-[0.12em] text-[#746f86]">
              <tr>
                <th className="px-6 py-3 font-medium">Recipient</th>
                <th className="px-6 py-3 font-medium">Phone</th>
                <th className="px-6 py-3 font-medium">Birthday</th>
                <th className="px-6 py-3 font-medium">Sender</th>
                <th className="px-6 py-3 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0e7e1]">
              {contacts.map((contact) => (
                <tr key={contact.id}>
                  <td className="px-6 py-4 font-bold text-[#27233b]">{contact.recipient_name}</td>
                  <td className="px-6 py-4 text-[#746f86]">{contact.recipient_phone}</td>
                  <td className="px-6 py-4 font-semibold text-[#746f86]">{String(contact.dob_day).padStart(2, "0")}/{String(contact.dob_month).padStart(2, "0")}</td>
                  <td className="px-6 py-4 text-[#746f86]">{contact.sender_name}</td>
                  <td className="px-6 py-4 text-right">
                    <button type="button" onClick={() => deleteContact(contact.id)} className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-red-600 transition hover:bg-red-50" aria-label={`Delete ${contact.recipient_name}`}>
                      <Trash2 size={16} /> <span className="sr-only sm:not-sr-only">Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
