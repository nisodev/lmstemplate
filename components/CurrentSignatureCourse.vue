<template>
  <div class="section section-padding">
    <div class="container">
      <!-- Section Title Start -->
      <div class="section-title text-center" data-aos="fade-up">
        <span class="sub-title">Learn at your Pace</span>
        <h2 class="title">Top Courses</h2>
      </div>
      <!-- Section Title End -->

      <!-- Course Wrapper Start -->
      <div class="row row-cols-lg-3 row-cols-md-2 row-cols-1 max-mb-n30">
        <div
          class="col max-mb-30"
          data-aos="fade-up"
          v-for="course in topCourses.slice(0, 3)"
          :key="course.id"
        >
          <div class="course-2">
            <div class="thumbnail">
              <n-link
                :to="`/course/course-details?id=${course.id}`"
                class="image"
              >
                <img :src="course.featuredImage" />
              </n-link>
            </div>
            <div class="info">
              <span
                v-if="course.isPaid === 0 || course.isPaid === false"
                class="price"
                >Free</span
              >
              <span v-else class="price"
                >{{ course.price }} {{ course.pricecurrency }}</span
              >
              <span class="date">{{
                course.actualOccurStartDate | DateTimeParse("MMMM Do YYYY")
              }}</span>
              <h3 class="title">
                <n-link to="/course/course-details">{{ course.title }}</n-link>
              </h3>
            </div>
          </div>
        </div>
      </div>
      <!-- Course Wrapper End -->

      <div class="row max-mt-70">
        <div class="text-center col-lg-7 mx-auto">
          <n-link to="/" class="link link-lg">
            Get the mostx dedicated consultation for your life-changing course.
            Earn a certification for your effort and passion
            <mark>Get Free Guide <i class="far fa-long-arrow-right"></i></mark>
          </n-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import courseData from "~/data/courses";
import Course from "../services/Course";
export default {
  data() {
    return {
      courseData,
      topCourses: [],
    };
  },
  created() {
    this.getTopCourses();
  },
  methods: {
    getTopCourses() {
      Course.getTopCourses(this.user?.accessToken)
        .then((res) => {
          this.topCourses = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style>
.section-padding {
  padding-top: 0px !important;
  padding-bottom: 100px;
}
</style>
