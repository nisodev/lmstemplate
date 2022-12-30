<template>
  <div>
    <img :src="asset" alt="">
  </div>
</template>

<script>
export default {
  name: 'ImageLesson',
props: {
    asset: {
      type: String,
      required: true,
    },
  },
}
</script>

<style>

</style>