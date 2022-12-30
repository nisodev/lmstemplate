import { config } from "dotenv"

const userMixin = {
  computed: {
    user () {
      return this.$store.getters['user/getUser']
    },
    config(){
      return this.$store.getters['config/getConfig'] || {title: ''}
    }
  }
}

export default userMixin
