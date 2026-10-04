import "./globals.css";

export const metadata = {
  title: "Birthday Automation Gateway",
  description: "Automate birthday SMS messages with Textbee."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
