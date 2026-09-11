import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "24px" },
    extend: {
      colors: {
        lime: "#AFFF49",
        "lime-deep": "#6FA800",
        "lime-forest": "#3F7A00",
        "lime-050": "#F2FFDE",
        "lime-100": "#E4FFBC",
        "lime-200": "#CBFF7E",
        ink: "#0A0B0D",
        "ink-raised": "#111318",
        "ink-line": "#1C1F24",
        paper: "#FFFFFF",
        "paper-warm": "#F7F8F3",
        line: "#E8EAE3",
        "text-primary": "#111827",
        "text-secondary": "#374151",
        "text-muted": "#6B7280",
        "on-dark": "#FFFFFF",
        "on-dark-2": "#C9CEC4",
        "on-dark-3": "#B9BEB2",
        "on-dark-4": "#9AA091",
        "on-dark-5": "#8A9080",
        "on-dark-6": "#7E8474",
        "ch-whatsapp": "#25D366",
        "ch-sms": "#53BDEB",
        "ch-sms-text": "#027EB5",
        "ch-rcs": "#3D82F5",
        "ch-voice": "#FF9A3E",
        "ch-ai": "#7C5CFF",
        "wa-bubble": "#D9FDD3",
        "device-bezel": "#1C1F24",
        "device-ground": "#EFE7DE",
      },
      fontFamily: {
        display: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        xs: "6px",
        sm: "10px",
        md: "12px",
        lg: "16px",
        xl: "44px",
      },
      maxWidth: {
        container: "1180px",
        "container-narrow": "1040px",
        "container-prose": "700px",
      },
      boxShadow: {
        card: "0 18px 44px -20px rgba(10,11,13,.35), 0 1px 4px rgba(10,11,13,.06), inset 0 1px 0 rgba(255,255,255,.9)",
        "card-sm": "0 6px 16px -6px rgba(10,11,13,.28), 0 1px 3px rgba(10,11,13,.10)",
        lime: "0 10px 26px -8px rgba(175,255,73,.65), inset 0 1px 0 rgba(255,255,255,.7)",
        "lime-glow": "0 0 22px 5px rgba(175,255,73,.55)",
        "lime-deep": "0 10px 30px -8px rgba(111,168,0,.45)",
        device: "0 30px 70px -20px rgba(0,0,0,.7)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.2, 0.7, 0.3, 1)",
        "in-out": "cubic-bezier(0.65, 0, 0.35, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      transitionDuration: {
        instant: "120ms",
        fast: "180ms",
        base: "240ms",
        slow: "400ms",
        reveal: "600ms",
        story: "700ms",
      },
      keyframes: {
        "count-fade": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
