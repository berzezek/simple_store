// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  app: {
    head: {
      title: 'store',
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css'
        }
      ]
    }
  },
  runtimeConfig: {
    baseApiUrl: process.env.API_URL,
    public: {
      baseApiUrl: process.env.API_URL || 'http://localhost:8000'
    },
  },
  plugins: [
    '~/plugins/auth.ts',
    '~/plugins/mainConfigs.ts',
  ],
})
