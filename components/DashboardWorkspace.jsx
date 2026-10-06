"use client";

import { useState } from "react";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";

export default function DashboardWorkspace({ userId }) {
  const [refreshKey, setRefreshKey] = useState(0);

  function refreshContacts() {
    setRefreshKey((current) => current + 1);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,390px)_1fr]">
      <ContactForm userId={userId} onContactAdded={refreshContacts} />
      <ContactList refreshKey={refreshKey} onContactDeleted={refreshContacts} />
    </div>
  );
}
