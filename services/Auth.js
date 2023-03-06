import clientAPI from './AxiosConfig'
export default {
  register (payload) {
    return clientAPI().post('/client/register', payload)
  },
  login (payload) {
    return clientAPI().post('/client/login', payload)
  },
  getUserDetails (token) {
    const customHeaders = {
      'x-access-token': token
    }
    return clientAPI(customHeaders).get('/client/user/getinfo')
  }
}
