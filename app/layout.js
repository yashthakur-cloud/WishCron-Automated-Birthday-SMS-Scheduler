import "./globals.css";
import Footer from "../components/Footer";

export const metadata = {
  title: "WishCron | Never Miss A Birthday Again",
  description: "Schedule personalized birthday wishes and send them automatically by SMS."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
