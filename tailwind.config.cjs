const plugin = require('tailwindcss/plugin');

/**@type {import("tailwindcss/tailwind-config").TailwindConfig}*/
module.exports = {
	content: ['./src/**/*.{svelte,html}'],
	theme: {
		colors: {
			pink: {
				300: '#f9cdcd'
			},
			black: {
				300: '#252422',
				full: '#000000'
			},
			white: {
				300: '#f4f4f4',
				full: '#FFFFFF'
			}
		},
		fontFamily: {
			sora: ["'Sora'", 'sans-serif']
		}
	},
	plugins: [
		plugin(({ addComponents, theme }) => {
			addComponents({
				'.noise-bg': {
					backgroundColor: theme('colors.white.300'),
					background: 'url(/noise.png) #f4f4f4',
					animation: 'noise 1s steps(2) infinite'
				}
			});
		})
	]
};
