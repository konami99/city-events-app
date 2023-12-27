import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0072ff",
          secondary: "#6fa200",
          accent: "#00acff", 
          neutral: "#090909", 
          "base-100": "#05343d",
          info: "#00f8ff",
          success: "#00fabd",
          warning: "#ffbe50",
          error: "#db173c",
        },
      },
    ],
  },
  plugins: [
    require('daisyui'),
  ],
}
export default config
