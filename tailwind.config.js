/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html, js}'],
  theme: {
    extend: {backgroundImage: {
      'gradient-radial-fire': 'radial-gradient(circle at 50% -5%, #FDDFDF 40%, #ffffff 36%)',
      'gradient-radial-grass': 'radial-gradient(circle at 50% -5%, #DEFDE0 40%, #ffffff 36%)',
      'gradient-radial-eletric': 'radial-gradient(circle at 50% -5%, #FCF7DE 40%, #ffffff 36%)',
      'gradient-radial-water': 'radial-gradient(circle at 50% -5%, #DEF3FD 40%, #ffffff 36%)',
      'gradient-radial-ground': 'radial-gradient(circle at 50% -5%, #F4E7DA 40%, #ffffff 36%)',
      'gradient-radial-rock': 'radial-gradient(circle at 50% -5%, #D5D5D4 40%, #ffffff 36%)',
      'gradient-radial-fairy': 'radial-gradient(circle at 50% -5%, #FCEAFF 40%, #ffffff 36%)',
      'gradient-radial-poison': 'radial-gradient(circle at 50% -5%, #98D7A5 40%, #ffffff 36%)',
      'gradient-radial-bug': 'radial-gradient(circle at 50% -5%, #F8D5A3 40%, #ffffff 36%)',
      'gradient-radial-dragon': 'radial-gradient(circle at 50% -5%, #97B3E6 40%, #ffffff 36%)',
      'gradient-radial-phychic': 'radial-gradient(circle at 50% -5%, #EAEDA1 40%, #ffffff 36%)',
      'gradient-radial-flying': 'radial-gradient(circle at 50% -5%, #F5F5F5 40%, #ffffff 36%)',
      'gradient-radial-fighting': 'radial-gradient(circle at 50% -5%, #E6E0D4 40%, #ffffff 36%)',
      'gradient-radial-normal': 'radial-gradient(circle at 50% -5%, #F5F5F5 40%, #ffffff 36%)',
      },
      fontFamily:{
        'body': ['"Oxanium"', 'sans-serif']
      },
      boxShadow: {
        'custom': '-3px 4px 0 #888, -5px 7px 0 #333',
        'custom2': '-2px 3px 0 #222, -4px 6px 0 #000',
        'custom3': 'inset -4px 4px 0 #222',
      },

      colors:{
        'corSecudaria': '#468F8A'
      },
      screens: {
        'tall': { 'raw': '(min-width: 1040px)' },
      },
    },
  },
  plugins: [],
}

