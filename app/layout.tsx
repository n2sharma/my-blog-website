import { ThemeProvider } from "next-themes";
import "./globals.css"; // Make sure Tailwind is imported here
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Specscart Blog",
  description: "Fullstack Blog using Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
