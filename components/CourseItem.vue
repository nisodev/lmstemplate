<template>
  <div
    @click="$router.push(`/course/course-details?id=${course.id}`)"
    class="course box-shadow"
    style="cursor: pointer"
  >
    <div class="thumbnail">
      <n-link :to="`/course/course-details?id=${course.id}`" class="image">
        <img
          :src="
            course.featuredImage ||
            require('~/assets/img/course-placeholder.jpeg')
          "
          :alt="course.title + 'Thumbnail'"
        />
      </n-link>
    </div>
    <div class="info">
      <span v-if="course.isPaid === 1" class="price"
        >{{ course.price }} {{ course.pricecurrency }}</span
      >
      <h3 class="title">
        <n-link to="/course/course-details">{{ course.title }}</n-link>
      </h3>
      <ul class="meta">
        <li v-if="course.courseLessonsCount">
          <i class="far fa-file-alt"></i>
          {{ course.courseLessonsCount }}
        </li>
        <li v-if="course.applyCount">
          <i class="far fa-user-alt"></i>
          {{ course.applyCount }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['course'],
};
</script>
