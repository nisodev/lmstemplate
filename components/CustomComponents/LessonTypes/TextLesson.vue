<template>
  <div>
    <p v-html="asset"></p>
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