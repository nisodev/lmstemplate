<template>
  <div class="course-details-page-wrapper">
    <HeaderStyleTwo />

    <OffCanvasMobileMenu />

    <div v-if="courseDetails" class="page-title-section section-padding-top-0">
      <div class="page-breadcrumb">
        <div class="container">
          <ul class="breadcrumb">
            <li>
              <n-link to="/">Home</n-link>
            </li>
            <li class="current">Course Details</li>
          </ul>
        </div>
      </div>

      <div class="page-title">
        <div class="container">
          <h1 class="title">{{ courseDetails.name }}</h1>
        </div>
        <div v-if="isPurchased" class="text-center payment-success-box">
          We successfully received your payment. The instructions will be sent
          you via email.
        </div>
        <div v-if="isFailure" class="text-center payment-error-box">
          Payment was unsuccessful. Please try again.
        </div>
      </div>
    </div>

    <CourseDetailsTab :courseDetails="courseDetails" />

    <RelatedCourse />

    <FooterStyleOne />
  </div>
</template>

<script>
import Course from "../../services/Course";
export default {
  layout: "default",
  components: {
    HeaderStyleTwo: () => import("@/components/HeaderStyleTwo"),
    OffCanvasMobileMenu: () => import("@/components/OffCanvasMobileMenu"),
    CourseDetailsTab: () => import("@/components/CourseDetailsTab"),
    RelatedCourse: () => import("@/components/RelatedCourse"),
    FooterStyleOne: () => import("@/components/FooterStyleOne"),
  },

  head() {
    return {
      title: "Course Details",
    };
  },

  data() {
    return {
      courseDetails: null,
    };
  },

  computed: {
    isPurchased() {
      if (
        this.$route.query.Result === "Successful" &&
        this.$route.query.PaymentId
      ) {
        return true;
      }
      return false;
    },
    isFailure() {
      if (
        this.$route.query.Result === "Failure" &&
        this.$route.query.PaymentId
      ) {
        return true;
      }
      return false;
    },
  },

  async mounted() {
    await Course.getCourseDetails(this.user?.accessToken, this.$route.query.id).then(
      (response) => {
        if (this.user) {
          this.courseDetails = response.data.data[0];
        } else {
          this.courseDetails = response.data.data;
        }
      }
    );
    if(this.isPurchased){
      this.registerComplete()
    }
      this.getReviews()
  },
  methods: {
    getReviews() {
      this.$store.dispatch('course/getReviews', {guid: this.courseDetails.courseguid, page: 1, take: 10})
    },
    async registerComplete() {
      let preData = {
        userguid: this.user.guid,
        courseguid: this.courseDetails.courseguid,
      };
      let preguid = null;
      await Course.preRegisterCourse(this.user?.accessToken, preData).then(
        (res) => {
          if (res.status === 200) {
            debugger
            preguid = res.data.data;
            Course.registerCourse(this.user.accessToken, {
              courseguid: this.courseDetails.courseguid,
              userguid: this.user.guid,
              purchasecode: preguid,
            }).then((res) => {
              if (res.data.success === 100) {
                this.$swal({
                   background:
                  this.$colorMode.value === "dark" ? "#1a1a1a" : "#fff",
                  position: "center",
                  icon: "success",
                  title: "Register completed!",
                });
              } else {
                this.$swal({
                   background:
                  this.$colorMode.value === "dark" ? "#1a1a1a" : "#fff",
                  position: "center",
                  icon: "warning",
                  title: res.data.message,
                  showConfirmButton: true,
                });
              }
            });
          }
        }
      );
    },
  },
};
</script>
<style scoped>
.payment-success-box {
  background-color: #268a29;
  padding: 20px;
  margin-top: 20px;
  color: #fff;
}

.payment-error-box {
  background-color: #e74c3c;
  padding: 20px;
  margin-top: 20px;
  color: #fff;
}
</style>
