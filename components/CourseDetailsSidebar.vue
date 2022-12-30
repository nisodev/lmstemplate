<template>
  <div v-if="courseDetails" class="sidebar-widget-wrapper pr-0">
    <div class="sidebar-widget">
      <div class="sidebar-widget-content">
        <div class="sidebar-entry-course-info">
          <div v-if="courseDetails.isPaid === 1 || courseDetails.isPaid === true" class="course-price">
            <span class="meta-label">
              <i class="meta-icon far fa-money-bill-wave"></i>
              Price
            </span>
            <span class="meta-value">
              <!-- <span
                class="price"
                v-if="
                  courseDetails.isPaid === 0 || courseDetails.isPaid === false
                "
                >Free</span
              > -->
              <span  class="price" 
                >{{ courseDetails.price }}
                {{ courseDetails.pricecurrency }}</span
              >
            </span>
          </div>
          <div class="course-meta">
            <div class="course-instructor">
              <span class="meta-label">
                <i class="far fa-chalkboard-teacher"></i>
                Instructor
              </span>
              <span class="meta-value">{{ courseDetails.presenterName }}</span>
            </div>
            <div class="course-duration">
              <span class="meta-label">
                <i class="far fa-clock"></i>
                Duration
              </span>
              <span class="meta-value"
                >{{ courseDetails.courseDurationMinutes }} Hours</span
              >
            </div>
            <div class="course-lectures">
              <span class="meta-label">
                <i class="far fa-file-alt"></i>
                Lectures
              </span>
              <span class="meta-value">{{
                courseDetails.courseLecturesCount
              }}</span>
            </div>

            <div class="course-students">
              <span class="meta-label">
                <i class="far fa-user-alt"></i>
                Enrolled
              </span>
              <span class="meta-value"
                >{{ courseDetails.applyCount }} students</span
              >
            </div>
            <div class="course-language">
              <span class="meta-label">
                <i class="far fa-language"></i>
                Language
              </span>
              <span class="meta-value">English</span>
            </div>
            <div v-if="courseDetails.actualOccurEndDate" class="course-time">
              <span class="meta-label">
                <i class="far fa-calendar"></i>
                Deadline
              </span>
              <span class="meta-value">{{
                courseDetails.actualOccurEndDate | DateTimeParse("MMMM Do YYYY")
              }}</span>
            </div>
          </div>
          <div class="lp-course-buttons">
            <button
              v-if="
                courseDetails.isRegistered === 1 ||
                $route.query.Result === 'Successful'
              "
              @click="$router.push('/course/profile?tab=courses')"
              class="btn btn-primary btn-hover-secondary btn-width-100"
            >
              Go to Course
            </button>
            <button
              v-else-if="$route.query.Result === 'Failure'"
              @click="register"
              class="btn btn-primary btn-hover-secondary btn-width-100"
            >
              Try Again
            </button>
            <button
              v-else-if="isFullyBooked"
              @click="register"
              class="btn btn-primary btn-hover-secondary btn-width-100"
            >
              {{ isFullyBooked ? "Notify Me" : "Enroll" }}
            </button>
            <button
              v-else-if="courseDetails.isPaid === 0 || courseDetails.isPaid === false"
              @click="register"
              class="btn btn-primary btn-hover-secondary btn-width-100"
            >
              {{ "Enroll" }}
            </button>
             <button
              v-else
              @click="register"
              class="btn btn-primary btn-hover-secondary btn-width-100"
            >
              Purchase
            </button>
          </div>
          <div class="entry-course-share">
            <div class="share-media">
              <div class="share-label">Share this course</div>
              <span class="share-icon far fa-share-alt"></span>

              <div class="share-list">
                <a
                  class="hint--bounce hint--top hint--theme-two"
                  aria-label="Facebook"
                  target="_blank"
                  href="JavaScript:Void(0);"
                >
                  <i class="fab fa-facebook-f"></i>
                </a>

                <a
                  class="hint--bounce hint--top hint--theme-two"
                  aria-label="Twitter"
                  target="_blank"
                  href="JavaScript:Void(0);"
                >
                  <i class="fab fa-twitter"></i>
                </a>

                <a
                  class="hint--bounce hint--top hint--theme-two"
                  aria-label="Linkedin"
                  target="_blank"
                  href="JavaScript:Void(0);"
                >
                  <i class="fab fa-linkedin"></i>
                </a>

                <a
                  class="hint--bounce hint--top hint--theme-two"
                  aria-label="Tumblr"
                  target="_blank"
                  href="JavaScript:Void(0);"
                >
                  <i class="fab fa-tumblr-square"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Mail from "../services/Mail";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Course from "~/services/Course";

export default {
  props: {
    courseDetails: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapGetters({ user: "user/getUser" }),
    isFullyBooked() {
      if (
        this.courseDetails.hasApplyLimit === 1 ||
        this.courseDetails.hasApplyLimit === true
      ) {
        if (this.courseDetails.applyCount >= this.courseDetails.applyCapacity) {
          return true;
        } else {
          return false;
        }
      } else {
        false;
      }
    },
    isPurchased() {
      if (this.$route.query.Result === "Successful") {
        return true;
      }
      return false;
    },
  },

  methods: {
    register() {
      //Kullanıcı login olmuş mu kontrolü
      if (!this.user) {
        this.$swal({
          position: "center",
          icon: "warning",
          background: this.$colorMode.value === "dark" ? "#1a1a1a" : "#fff",
          confirmButtonText: "Register&Login",
          showCancelButton: true,
          cancelButtonText: "Cancel",
          title: "Please login to register for this course",
          showConfirmButton: true,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.$router.push(
              `/login-register?redirect=${this.$route.path}?id=${this.courseDetails.id}`
            );
          }
        });
        return;
      }
      //Kurs kapasitesi kontrolü
      if (this.isFullyBooked) {
        const data = {
          userguid: this.user.guid,
          courseguid: this.courseDetails.courseguid,
        };
        Mail.notifyMe(this.user?.accessToken, data)
          .then((res) => {
            if (res.data && res.data.success) {
              this.$swal({
                position: "center",
                icon: "success",
                background:
                  this.$colorMode.value === "dark" ? "#1a1a1a" : "#fff",
                title: "You will be notified when a seat is available",
                showConfirmButton: true,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
        //Kurs kapasitesi dolmamış ise devam ediyorum.
      } else {
        //Eğer kurs ücretli ise satın alma metodunu çalıştırıyorum.
        if (
          this.courseDetails.isPaid === 1 ||
          this.courseDetails.isPaid === true
        ) {
          this.handlePayment();
        } else {
          //Kurs ücretsizse register ediyorum.
          this.registerFree();
        }
      }
    },
    handlePayment() {
      const data = {
        checkoutCode: uuidv4(),
        amount: this.courseDetails.price,
        email: this.user.email,
        oid: uuidv4(),
        token: "",
        courseId: this.courseDetails.id,
      };
      axios
        .post("/api/checkout/payment", data)
        .then((res) => {
          if (!res.data.targetUrl) {
          } else {
            window.location.href =
              res.data.targetUrl + "?paymentid=" + res.data.payid;
          }
        })
        .catch((e) => {});
    },
    async registerFree(){
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
                  timer: 1000,
                });
              } else {
                this.$swal({
                  position: "center",
                  background:
                  this.$colorMode.value === "dark" ? "#1a1a1a" : "#fff",
                  icon: "warning",
                  title: res.data.message,
                  showConfirmButton: true,
                });
              }
              setTimeout(() => {
                location.reload()
              }, 1000);
            });
          }
        })
    }
    
  },
};
</script>
