"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { countryCallingCodes } from "../lib/countryCallingCodes";
import { supabase } from "../lib/supabase-client";

const initialForm = {
  sender_name: "",
  recipient_name: "",
  country: "IN",
  recipient_phone: "",
  dob_month: "",
  dob_day: "",
  custom_message: ""
};

export default function ContactForm({ userId, onContactAdded }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    const nextValue = name === "recipient_phone" ? value.replace(/\D/g, "").slice(0, 10) : value;
    setForm((current) => ({ ...current, [name]: nextValue }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: "", message: "" });
    setIsSubmitting(true);

    try {
      const senderName = form.sender_name.trim();
      const recipientName = form.recipient_name.trim();
      const phoneNumber = form.recipient_phone.replace(/\D/g, "");

      if (/\d/.test(senderName) || /\d/.test(recipientName)) {
        throw new Error("Sender and recipient names must not contain numbers.");
      }
      if (phoneNumber.length !== 10) {
        throw new Error("Phone number must contain exactly 10 digits.");
      }

      const { error } = await supabase.from("contacts").insert({
        user_id: userId,
        sender_name: senderName,
        recipient_name: recipientName,
        recipient_phone: `+${countryCallingCodes.find((item) => item.country === form.country).callingCode}${phoneNumber}`,
        dob_month: Number(form.dob_month),
        dob_day: Number(form.dob_day),
        custom_message: form.custom_message.trim() || null
      });

      if (error) {
        throw new Error(error.message || "Unable to save contact.");
      }

      setForm(initialForm);
      setStatus({ type: "success", message: "Birthday contact saved." });
      await onContactAdded();
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-[#e3d9d4] bg-[#fffdf9] px-3.5 py-3 text-sm text-[#27233b] outline-none transition placeholder:text-[#aaa2b1] focus:border-[#8d83ce] focus:ring-4 focus:ring-[#eee9ff]";

  return (
    <form onSubmit={handleSubmit} className="rise-in min-w-0 rounded-[26px] border border-[#eadfda] bg-[#fffdf9] p-5 shadow-[0_18px_45px_rgba(61,43,74,0.08)] sm:p-7">
      <div className="mb-7 flex items-center gap-3 border-b border-dashed border-[#eadfda] pb-6">
        <div className="rounded-xl bg-[#eee9ff] p-2.5 text-[#665bb8]">
          <Plus size={20} />
        </div>
        <div>
          <h2 className="font-serif text-lg font-bold text-[#27233b] sm:text-xl">Add a birthday</h2>
          <p className="text-sm text-[#746f86]">We&apos;ll send the wish at 8:00 AM IST.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-bold text-[#4e485e]">
          Sender name
          <input className={inputClass} name="sender_name" value={form.sender_name} onChange={handleChange} pattern="[^0-9]*" title="Name must not contain numbers." required />
        </label>
        <label className="text-sm font-bold text-[#4e485e]">
          Recipient name
          <input className={inputClass} name="recipient_name" value={form.recipient_name} onChange={handleChange} pattern="[^0-9]*" title="Name must not contain numbers." required />
        </label>
        <label className="text-sm font-bold text-[#4e485e]">
          Country
          <select className={inputClass} name="country" value={form.country} onChange={handleChange} required>
            {countryCallingCodes.map(({ country, callingCode, name }) => (
              <option key={country} value={country}>{name} (+{callingCode})</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-bold text-[#4e485e]">
          Recipient phone number
          <input className={inputClass} name="recipient_phone" type="tel" inputMode="numeric" placeholder="9876543210" maxLength="10" pattern="[0-9]{10}" title="Phone number must contain exactly 10 digits." value={form.recipient_phone} onChange={handleChange} required />
        </label>
        <label className="text-sm font-bold text-[#4e485e]">
          Birth month
          <select className={inputClass} name="dob_month" value={form.dob_month} onChange={handleChange} required>
            <option value="">Select month</option>
            {Array.from({ length: 12 }, (_, index) => (
              <option key={index + 1} value={index + 1}>{new Date(2000, index).toLocaleString("en", { month: "long" })}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium text-slate-700">
          Birth day
          <select className={inputClass} name="dob_day" value={form.dob_day} onChange={handleChange} required>
            <option value="">Select day</option>
            {Array.from({ length: 31 }, (_, index) => (
              <option key={index + 1} value={index + 1}>{index + 1}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-bold text-[#4e485e] sm:col-span-2">
          Custom message <span className="font-normal text-slate-400">(optional)</span>
          <textarea className={inputClass} name="custom_message" rows="3" value={form.custom_message} onChange={handleChange} placeholder="Happy birthday! Have a fantastic day." />
        </label>
      </div>

      {status.message && (
          <p className={`mt-4 rounded-xl px-3 py-2 text-sm font-semibold ${status.type === "error" ? "bg-[#fff0ed] text-[#c74646]" : "bg-[#e5f4ea] text-[#327052]"}`}>
          {status.message}
        </p>
      )}
      <button type="submit" disabled={isSubmitting} className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#f06459] px-4 py-3.5 text-sm font-bold text-white shadow-[0_5px_0_#d94d49] transition hover:-translate-y-0.5 hover:bg-[#e85a53] hover:shadow-[0_6px_0_#d94d49] active:translate-y-0.5 active:shadow-[0_3px_0_#d94d49] disabled:cursor-not-allowed disabled:opacity-60">
        {isSubmitting ? "Saving..." : "Save birthday"}
      </button>
    </form>
  );
}
