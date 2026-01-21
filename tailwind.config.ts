import type { Config } from "tailwindcss";

export default <Config>{
  content: [
    "./app/components/**/*.{js,vue,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.{js,ts}",
    "./app/app.vue",
    "./app/error.vue",
  ],
  theme: {
    extend: {
      colors: {
        void: "#080808",
        surface: "#121212",
        accent: "#2563EB", // Electric Blue
        highlight: "#FFFFFF",
        text: {
          primary: "#E5E5E5",
          secondary: "#A0A0A0",
        },
        muted: "#404040",
        grid: "#202020",
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body: ["Outfit", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, #202020 1px, transparent 1px), linear-gradient(to bottom, #202020 1px, transparent 1px)",
      },
    },
  },
};
