<template>
  <div
    v-if="banner"
    class="intro1-section section-fluid"
    :style="{ backgroundImage: `url(${banner.bannerimage})` }"
  >
    <div class="container">
      <div class="row row-cols-md-2 row-cols-1 max-mb-n30">
        <!-- Intro One Content Start -->
        <div class="col align-self-center max-mb-30">
          <div class="intro1-content text-center text-md-left">
            <!-- <span class="sub-title">MaxCoach is the lifebuoy</span> -->
            <h2 class="title">
              ELDOR <br>LMS
            </h2>
            <div class="desc">
              <p>
                The right mentoring relationship can be a powerful tool for
                professional growth. Bark up the right tree.
              </p>
            </div>
            <!-- <a
              class="btn btn-primary btn-hover-secondary"
              href="/images/sample.pdf"
              target="_blank"
            >
              <i class="far fa-download mr-3"></i>
              Download free guide
            </a> -->
          </div>
        </div>
        <!-- Intro One Content End -->

        <!-- Intro One Course Start -->
        <div v-if="course" class="col max-mb-30">
          <div class="intro1-course">
            <img
              class="popular-course-icon"
              src="/images/intro/intro1/intro-popular-course.png"
              alt="image"
            >
            <!-- Course Start -->
            <div
              class="course-2"
              @click="$router.push(`/course/course-details?id=${course.id}`)"
            >
              <div class="thumbnail">
                <n-link to="/" class="image">
                  <img :src="course.featuredImage" alt="Course Image">
                </n-link>
              </div>
              <div class="info">
                <span
                  v-if="course.isPaid"
                  class="price"
                >{{ course.price }} {{ course.pricecurrency }}</span>
                <!-- <span class="price" v-else>Free</span> -->
                <span class="date">{{
                  course.actualOccurStartDate | DateTimeParse('MMMM Do YYYY')
                }}</span>
                <h3 class="title">
                  <n-link to="/">
                    {{ course.title }}
                  </n-link>
                </h3>
                <div class="desc">
                  <p>
                    {{ course.subtext }}
                  </p>
                </div>
              </div>
            </div>
            <!-- Course End -->

            <ShapeWithAnimation
              add-class-name="intro1-scene"
              data-depth="3"
              img-src="/images/shape-animation/shape-1.png"
            />
          </div>
        </div>
        <!-- Intro One Course End -->
      </div>
    </div>

    <!-- Section Bottom Shape Start -->
    <div class="section-bottom-shape">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        height="100"
      >
        <path d="M 0 0 L100 0 Q 50 200 0 0" />
      </svg>
    </div>
    <!-- Section Bottom Shape End -->
  </div>
</template>

<script>
import Banner from '../services/Banner'
import Course from '../services/Course'
export default {
  components: {
    ShapeWithAnimation: () => import('@/components/ShapeWithAnimation')
  },
  data () {
    return {
      banner: null,
      course: null
    }
  },
  async mounted () {
    Banner.getMain().then((res) => {
      this.banner = res.data.client.homebanner[0]
    })
    // TODO
    await Course.getAllCourses(this.user?.accessToken).then((res) => {
      this.course = res.data.data[0]
    }).catch((err) => {
      console.log(err)
      this.$swal({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! (CORS)'
      })
      this.course = {}
    })
  }
}
</script>
