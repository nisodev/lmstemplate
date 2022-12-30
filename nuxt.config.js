import { API_URL } from './const/const.js'
export default {
  generate: {
    fallback: true
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['assets/scss/style.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/vue-awesome-swiper.js',
    '~/plugins/silentbox.js',
    '~/plugins/vue2-google-maps.js',
    '~/plugins/vuejs-paginate.js',
    '~/plugins/filters.js',
    '~/plugins/vue-select.js',
    '~/plugins/vue-inline-svg.js',
    { src: '@/plugins/vimeo.js', ssr: false },
    {
      src: '~/plugins/aos',
      ssr: false
    },
    {
      src: '~/plugins/typed.js',
      ssr: true
    },
    {
      src: '~plugins/vue-backtotop.js',
      ssr: false
    },
    {
      src: '~plugins/countdown.js',
      ssr: false
    }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  serverMiddleware: [{ path: '/', handler: '~/server-middleware/rest.js' }],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/style-resources',
    '@nuxtjs/color-mode',
    '@nuxtjs/axios',
    'vue-sweetalert2/nuxt',
    'cookie-universal-nuxt'
  ],

  axios: {
    baseURL: API_URL
  },

  env: {
    CLIENT_AUTH_TOKEN: process.env.CLIENT_AUTH_TOKEN,
    API_URL: process.env.API_URL
  },

  styleResources: {
    scss: ['~/assets/scss/_variables.scss']
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend (config, ctx) {
      config.node = {
        fs: 'empty'
      }
    },

    transpile: [/^vue2-google-maps($|\/)/]
  }
}
