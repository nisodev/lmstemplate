<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
import Vue from 'vue'
import userMixin from '../mixins/userMixin'
Vue.mixin(userMixin)
export default {
  middleware: ["auth", "config"],
  async beforeCreate () {
    await this.$store.dispatch("config/getConfig")
  },
};
</script>
