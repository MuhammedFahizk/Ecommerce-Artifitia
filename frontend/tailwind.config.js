/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Correct content paths
  ],
  theme: {
    extend: {
      colors: {
        primary: "#003F62",
        secondary: "#EDA415", 
        info: '#F4F8F5',
        btn: '#EEEEEE'
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
