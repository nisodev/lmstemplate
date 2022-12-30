<template>
  <div class="video-content">
    <vimeo-player
      class="vimeo"
      ref="player"
      @timeupdate="timeupdate"
      :video-id="asset"
      :options="{ responsive: true }"
    ></vimeo-player>
  </div>
</template>

<script>
export default {
  name: 'VideoLesson',
  props: {
    asset: {
      type: String,
      required: true,
    },
  },
  methods: {
    timeupdate(e) {
      this.$emit('timeupdate', e);
    }
  },
};
</script>

<style>
.video-content {
  height: 100%;
}

</style>