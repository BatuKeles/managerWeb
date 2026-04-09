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
        // Tech dark theme tokens
        "t-black": "#080810",
        "t-dark": "#0f0f1a",
        "t-surface": "#16162a",
        "t-border": "rgba(255,255,255,0.07)",
        "t-accent": "#6366f1",
        "t-accent-dim": "#4f46e5",
        "t-white": "#f0f0ff",
        "t-gray": "#9494b0",
        "t-gray-dim": "#5a5a7a",
        "t-light": "#f4f4f8",
        "t-light-low": "#e8e8f0",
        "t-on-light": "#12121e",
        "t-on-light-dim": "#5a5a7a",
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
