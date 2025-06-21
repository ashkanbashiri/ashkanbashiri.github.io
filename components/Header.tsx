// app/components/Header.js
"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import clsx from "clsx";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Cleanup on unmount
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);
  useEffect(() => {
    const handleEsc = (event: { key: string }) => {
      if (event?.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    // Cleanup event listener
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full text-foreground bg-background backdrop-blur-lg border-b border-border z-30">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6 md:px-0">
        <Link href="/" className="flex items-center space-x-3">
          <img
            src="/logo.jpeg"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-xl font-extrabold text-foreground">
            Ashkan Bashiri
          </span>
        </Link>
        <nav className="hidden md:flex space-x-8">
          <Link
            key="resume"
            href="/resume"
            className="relative text-sm font-medium text-foreground hover:text-primary transition"
          >
            Resume
            <span className="absolute bottom-0 left-0 h-1 w-0 bg-primary rounded-full transition-all group-hover:w-full"></span>
          </Link>
          {["projects", "writings", "skills", "contact"].map((sec) => (
            <Link
              key={sec}
              href={`/#${sec}`}
              className="relative text-sm font-medium text-foreground hover:text-primary transition"
            >
              {sec.charAt(0).toUpperCase() + sec.slice(1)}
              <span className="absolute bottom-0 left-0 h-1 w-0 bg-primary rounded-full transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-primary-foreground hover:bg-primary/30 transition cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun size={20} className="hover:fill-yellow-500" />
            ) : (
              <Moon size={20} className="hover:fill-blue-950" />
            )}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-full bg-primary-foreground hover:bg-primary/30 transition cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={clsx(
          "md:hidden fixed left-0 top-[4.5rem] right-0 bottom-0 bg-white dark:bg-gray-900 min-h-[calc(100vh-4.5rem)] h-[calc(100vh-4.5rem)] text-black dark:text-zinc-50 transition-transform duration-300 ease-in-out z-50",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <nav className="flex flex-col items-center justify-center min-h-full gap-6">
          <Link
            key="resume"
            href="/resume"
            className="text-2xl font-semibold text-foreground hover:text-primary-foreground transition-colors"
            onClick={() => setOpen(false)}
          >
            Resume
          </Link>
          {["projects", "writings", "skills", "contact"].map((sec) => (
            <Link
              key={sec}
              href={`/#${sec}`}
              className="text-2xl font-semibold text-foreground hover:text-primary-foreground transition-colors"
              onClick={() => setOpen(false)}
            >
              {sec.charAt(0).toUpperCase() + sec.slice(1)}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
