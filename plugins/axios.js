import { CLIENT_AUTH_TOKEN } from '../const/const'

export default function ({ $axios, redirect, app }) {
  $axios.onRequest((config) => {
    const user = app.$cookies.get('user')
    config.headers = {
      'Client-Auth-Token': CLIENT_AUTH_TOKEN,
      'x-access-token': user?.accessToken || null,
      lang: 'en'
    }
  })
}
