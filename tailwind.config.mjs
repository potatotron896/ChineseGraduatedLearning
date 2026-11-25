/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "var(--color-canvas)",
        surface: "var(--color-surface)",
        "surface-elevated": "var(--color-surface-elevated)",
        ink: "var(--color-ink)",
        muted: "var(--color-muted)",
        subtle: "var(--color-subtle)",
        border: "var(--color-border)",
        jade: {
          DEFAULT: "var(--color-jade)",
          deep: "var(--color-jade-deep)",
          soft: "var(--color-jade-soft)",
          border: "var(--color-jade-border)",
        },
        cinnabar: {
          DEFAULT: "var(--color-cinnabar)",
          soft: "var(--color-cinnabar-soft)",
          border: "var(--color-cinnabar-border)",
        },
        ginkgo: {
          DEFAULT: "var(--color-ginkgo)",
          soft: "var(--color-ginkgo-soft)",
        },
      },
      fontFamily: {
        sans: ["var(--font-ui)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        zh: ["var(--font-zh-active)"],
        "zh-app": ["var(--font-zh-app)"],
        "zh-school": ["var(--font-zh-school)"],
        "zh-book": ["var(--font-zh-book)"],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
      },
    },
  },
  plugins: [],
};

