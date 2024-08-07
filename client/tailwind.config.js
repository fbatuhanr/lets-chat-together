/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('/src/assets/hero.png')",
        'blur-ellipse': "url('/src/assets/ellipse.png')",
        'blur-ellipse-small': "url('/src/assets/ellipse-small.png')",

        'sunset-on-venus': "url('/src/assets/background/sunset-on-venus.png')",
        'poseidons-realm': "url('/src/assets/background/poseidons-realm.png')",
        'fragment-of-saturn': "url('/src/assets/background/fragment-of-saturn.png')",
        'distance-nebulae': "url('/src/assets/background/distance-nebulae.png')",
        'alfheim-forest': "url('/src/assets/background/alfheim-forest.png')",
        'cosmic-butterfly-original': "url('/src/assets/background/cosmic-butterfly-original.png')",
        'cosmic-butterfly': "url('/src/assets/background/cosmic-butterfly.png')",
        'cosmic-butterfly-right': "url('/src/assets/background/cosmic-butterfly-right.png')",
        'cosmic-butterfly-left': "url('/src/assets/background/cosmic-butterfly-left.png')"
      },
      fontFamily: {
        "outfit": ['Outfit', 'sans-serif'],
        "roboto": ['Roboto', 'sans-serif']
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    function ({ addBase }) {
      addBase({
        'button, [type="button"], [type="reset"], [type="submit"]': {
          backgroundColor: 'initial', // Tailwind'in varsayılan 'transparent' yerine 'initial' kullanabilirsiniz
          backgroundImage: 'none',    // İsteğe bağlı, varsayılan stilin önüne geçer
        }
      })
    }
  ]
}

