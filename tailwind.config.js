/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "black-rgba": "rgba(0, 0, 0, 0.6)",
            },
        },
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: ["light", "dark", "cupcake", "bumblebee"],
    },
}