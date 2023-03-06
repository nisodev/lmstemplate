import clientAPI from './AxiosConfig'

export default {
  getConfig (key) {
    return clientAPI().get('cms/getconfig')
  }
}
