/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
}

module.exports = {
	api: {
		bodyParser: false,
	},
	webpack: config => {
		// Разрешить использование fs на сервере
		config.node = {
			fs: 'empty',
		}
		return config
	},
}

module.exports = nextConfig
