import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
    extend: {
      colors: {
        // Light theme tokens — names kept for backwards compat, values inverted to light palette
        "t-black": "#fbfaf7",          // page background (warm cream off-white)
        "t-dark": "#f1f4f8",           // alternating section background
        "t-surface": "#ffffff",        // elevated card surface
        "t-border": "rgba(15,23,42,0.08)",
        "t-accent": "#6366f1",         // primary indigo (works on both)
        "t-accent-dim": "#4f46e5",
        "t-white": "#0f172a",          // text primary (was bright, now near-black)
        "t-gray": "#475569",           // text secondary
        "t-gray-dim": "#94a3b8",       // text muted
        "t-light": "#f8fafc",          // hero subtle bg
        "t-light-low": "#eef2f6",      // alt subtle
        "t-on-light": "#0f172a",
        "t-on-light-dim": "#475569",
        // Sport energy palette (additions)
        "t-energy": "#f97316",         // orange — sports vibe
        "t-success": "#10b981",
        "t-warning": "#f59e0b",
        // Kinetic Club design tokens (kept for pricing/admin)
        "kc-primary": "#001e40",
        "kc-primary-container": "#003366",
        "kc-secondary": "#a63500",
        "kc-secondary-fixed": "#ffdbcf",
        "kc-on-secondary-fixed": "#390c00",
        "kc-on-primary": "#ffffff",
        "kc-on-primary-container": "#799dd6",
        "kc-surface": "#f8f9fa",
        "kc-surface-low": "#f3f4f5",
        "kc-surface-high": "#e7e8e9",
        "kc-surface-lowest": "#ffffff",
        "kc-surface-highest": "#e1e3e4",
        "kc-on-surface": "#191c1d",
        "kc-on-surface-variant": "#43474f",
        "kc-outline-variant": "#c3c6d1",
        "kc-tertiary-fixed": "#a3f69c",
        "kc-on-tertiary-fixed": "#002204",
        // Keep existing shadcn tokens
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
      },
      fontFamily: {
        headline: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
