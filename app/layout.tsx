import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import ThemeProvider from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Masoud Bashiri | Portfolio",
  description: "Software Engineer • Builder • Writer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="" lang="en" suppressHydrationWarning>
      {/* <div className="absolute -top-64 -left-64 w-[600px] h-[600px] rounded-full bg-primary/20 blur-2xl animate-blob" />
      <div className="absolute -bottom-64 -right-64 w-[500px] h-[500px] rounded-full bg-secondary/20 blur-2xl animate-blob animation-delay-2000" /> */}
      <body
        className={cn(
          "bg-background text-foreground antialiased font-inter",
          inter.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="relative w-full max-w-full bg-body z-10 flex flex-col gap-32 px-6 pt-20 pb-20 md:px-16 lg:px-24 min-h-screen">
            {children}
          </main>
          <Footer />
          {/* Background blobs */}
        </ThemeProvider>
      </body>
    </html>
  );
}
