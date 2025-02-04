/** @type {import('tailwindcss').Config} */
module.exports = {
    presets: [require('@spartan-ng/brain/hlm-tailwind-preset')],
    content: ["./src/**/*.{html,ts}"],
    theme: {
        extend: {
            fontFamily: {
                IBMPlexMono: ["IBM Plex Mono", "serif"]
            }
        },
    },
    plugins: [],
}

