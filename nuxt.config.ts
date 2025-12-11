// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },

	css: [
		'~/assets/styles/main.css'
	],

	app: {
		head: {
			title: 'Shoppe',
			titleTemplate: '%s | Shoppe',
			htmlAttrs: {
				lang: 'ru'
			},
			link: [
				{
					rel: 'stylesheet',
					href: 'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css'
				},
				{
					rel: 'icon',
					type: 'image/svg',
					href: '/favicon.svg'
				}
			]
		}
	},

	icon: {
		customCollections: [
			{
				prefix: 'icons',
				dir: './app/assets/icons'
			}
		]
	},

	modules: [
		'@nuxt/eslint',
		'@nuxt/fonts',
		'@nuxt/icon',
		'@nuxt/image',
		'@nuxt/scripts'
	]
})
