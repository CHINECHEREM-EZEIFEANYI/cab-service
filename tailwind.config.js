/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#BA68C8",
        white: "#fafafa",
        primaryDark: "#5F0A56",
        darkGrey: "#a3a3a3",
        green: "#13B351",
        black: "#0a0a0a",
        red: "#EB4335",
        background: "rgba(158, 133, 145, 0.6)",
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        jost: ["var(--font-jost)"],
        righteous: ["var(--font-righteous)"],
        permanent_marker: ["var(--font-permanent_marker)"],
      },
      backgroundImage: {
        auth: 'url("/images/taxi-photo.webp")',
      },
    },
  },
  plugins: [],
};
