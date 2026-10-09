import "./globals.css";
import Footer from "../components/Footer";
import { createSupabaseServerClient } from "../lib/supabase-server";

export const metadata = {
  title: "WishCron | Never Miss A Birthday Again",
  description: "Schedule personalized birthday wishes and send them automatically by SMS."
};

export default async function RootLayout({ children }) {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body>
        {children}
        <Footer isAuthenticated={Boolean(user)} />
      </body>
    </html>
  );
}
