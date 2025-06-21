/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        background: "#fff",
        foreground: "hsl(var(--foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        body: "hsl(var(--body-bg))",
        "nav-bg": "hsl(var(--nav-bg))",
        "nav-icons": "hsl(var(--nav-icons))",
      },
      fontFamily: {
        "noto-sans": ["var(--font-noto-sans)", "sans-serif"],
        headers: ["var(--headers-font-family)", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
    },
  },
  darkMode: "class",
  content: ["./**/*.{js,ts,jsx,tsx,mdx,css}", "./styles/**/*.{css}"],
};
