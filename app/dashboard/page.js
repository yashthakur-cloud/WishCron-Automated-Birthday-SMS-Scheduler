import { redirect } from "next/navigation";
import Navbar from "../../components/Navbar";
import DashboardWorkspace from "../../components/DashboardWorkspace";
import { createSupabaseServerClient } from "../../lib/supabase-server";

export default async function DashboardPage() {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <Navbar userEmail={user.email} />
      <main className="birthday-shell mx-auto min-h-[calc(100vh-81px)] max-w-7xl px-4 py-7 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
        <div className="rise-in mb-9 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#d94d49]">Your birthday desk</p>
            <h2 className="max-w-2xl font-serif text-4xl font-bold leading-tight tracking-tight text-[#27233b] sm:text-5xl">Make every birthday feel <span className="text-[#d94d49]">remembered.</span></h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#746f86]">Save the people you love once. Your connected Android phone will deliver a personal birthday SMS right on time.</p>
          </div>
        </div>
        <DashboardWorkspace userId={user.id} />
      </main>
    </>
  );
}
