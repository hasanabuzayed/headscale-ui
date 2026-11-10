const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	daisyui: {
		themes: [
			{
				hsui: {
					"primary": "#065f46",
					"secondary": "#0369a1",
					"accent": "#6b21a8",
					"neutral": "#78716c",
					"base-100": "#FFFFFF",
					"info": "#3ABFF8",
					"success": "#36D399",
					"warning": "#FBBD23",
					"error": "#F87272",
				},
			},
			{
				// Catppuccin Mocha. Terminal styling (font, square corners) lives in src/app.css.
				"catppuccin-mocha": {
					"primary": "#cba6f7",
					"primary-content": "#11111b",
					"secondary": "#89b4fa",
					"secondary-content": "#11111b",
					"accent": "#94e2d5",
					"accent-content": "#11111b",
					"neutral": "#313244",
					"neutral-content": "#cdd6f4",
					"base-100": "#1e1e2e",
					"base-200": "#181825",
					"base-300": "#11111b",
					"base-content": "#cdd6f4",
					"info": "#74c7ec",
					"info-content": "#11111b",
					"success": "#a6e3a1",
					"success-content": "#11111b",
					"warning": "#f9e2af",
					"warning-content": "#11111b",
					"error": "#f38ba8",
					"error-content": "#11111b",
					"--rounded-box": "0",
					"--rounded-btn": "0",
					"--rounded-badge": "0",
					"--tab-radius": "0",
					"--animation-btn": "0.1s",
					"--btn-focus-scale": "1",
				},
			},
			"light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"
		],
	},

	plugins: [require("@tailwindcss/typography"), require("daisyui")]
};

module.exports = config;
