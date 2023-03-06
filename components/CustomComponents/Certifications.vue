<template>
  <div>
    <b-table class="certs-table" striped :items="items" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { age: 38, first_name: 'Jami', last_name: 'Carney' }
      ]
    }
  },
  mounted () {
    const res = this.$store.dispatch('certification/getCerts')
    console.log(res)
  }
}
</script>

<style lang="scss">
.certs-table{
  th{
  background-color: #111111;
  color: #fff;
  }
}
</style>
