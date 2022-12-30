<template>
  <div class="pdf-content">
    <embed :src="asset" width="100%" height="100%" />
  </div>
</template>

<script>
export default {
  name: 'PdfLesson',
  props: {
    asset: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
.pdf-content {
  height: 100%;
}
</style>