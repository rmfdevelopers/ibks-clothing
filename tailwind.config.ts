import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { 
    extend: {
      colors: { 
        primary: "#1b2a4e", 
        secondary: "#fdfaf5", 
        accent: "#ffab4c" 
      },
      fontFamily: { 
        heading: ["var(--font-heading)"], 
        sans: ["var(--font-body)"] 
      }
    }
  },
  plugins: []
};
export default config;