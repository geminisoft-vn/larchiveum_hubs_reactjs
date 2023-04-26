/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			zIndex: {
				99: "99",
				999: "999",
				9999: "9999",
			},
		},
		fontSize: {
			sm: "0.8rem",
			df: "1rem",
			lg: "1.25rem",
			xl: "1.5rem",
			"2xl": "1.75rem",
			"3xl": "2rem",
		},
	},
	plugins: [],
};
