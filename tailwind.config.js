const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                frosted: 'rgba(255,255,255,0.1)'
            },
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
            spacing: {
                '420': '420px',
                '640': '640px'
            },
        }
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
