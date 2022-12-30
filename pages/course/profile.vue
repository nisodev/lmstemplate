<template>
  <div class="profile-page-wrapper">
    <HeaderStyleTwo />

    <OffCanvasMobileMenu />

    <!-- Profile Section Start  -->
    
    <!-- Profile Section End  -->

    <!-- Learn Press Profile Section Start -->
    <div class="mt-4 learn-press-profile-section section section-padding-bottom">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="lp-profile-content learn-press-profile-nav">
              <b-tabs pills card>
                 <b-tab title="Profile">
                 <div class="profile-section section-padding-bottom">
      <div class="container">
        <div class="row align-items-lg-center">
          <div class="col-xl-3 col-md-6">
            <div @click="onPhotoClicked" class="profile-image">
              <input
                v-on:change="onFileUploaded"
                v-show="false"
                type="file"
                id="file"
              />
              <img
              style="height: 24rem; object-fit: contain;"
                :src="user.photo || '/images/profile/profile.jpeg'"
                alt="profile"
              />
            </div>
          </div>
          <div class="col-xl-8 col-md-6 offset-xl-1">
            <div class="profile-info">
              <div class="d-flex align-items-center">
                <h3 class="profile-name">{{ user.fullname }}</h3>
                <!-- <i @click="editProfile" class="fas fa-pencil"></i> -->
              </div>
              <div v-if="user.additionalInfo" class="author-career">
                /{{ user.additionalInfo.workTitle }}
              </div>
              <!-- <p class="author-bio">
                Maggie is a brilliant educator, whose life was spent for
                computer science and love of nature. Being a female, she
                encountered a lot of obstacles and was forbidden to work in this
                field by her family. With a true spirit and talented gift, she
                was able to succeed and set an example for others.
              </p> -->

              <h5 class="profile-contact-title">Contact</h5>
              <div>
                <span class="contact-info-text">
                  <span class="phone">
                    Phone number: <strong>{{ user.mobile }}</strong>
                  </span>
                  <br />
                  <span class="email">
                    Email: <strong>{{ user.email }}</strong>
                  </span>
                </span>
              </div>
              <!-- <ul class="author-social-networks">
                <li class="item">
                  <a
                    href="https://twitter.com/"
                    target="_blank"
                    class="social-link"
                  >
                    <i class="fab fa-twitter social-link-icon"></i>
                  </a>
                </li>
                <li class="item">
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    class="social-link"
                  >
                    <i class="fab fa-facebook-f social-link-icon"></i>
                  </a>
                </li>
                <li class="item">
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    class="social-link"
                  >
                    <i class="fab fa-instagram social-link-icon"></i>
                  </a>
                </li>
                <li class="item">
                  <a
                    href="https://www.pinterest.com/"
                    target="_blank"
                    class="social-link"
                  >
                    <i class="fab fa-pinterest social-link-icon"></i>
                  </a>
                </li>
                <li class="item">
                  <a
                    href="https://www.youtube.com/"
                    target="_blank"
                    class="social-link"
                  >
                    <i class="fab fa-youtube social-link-icon"></i>
                  </a>
                </li>
              </ul> -->
            </div>
          </div>
        </div>
      </div>
    </div>
                </b-tab>

                <b-tab title="Dashboard">
                  <div class="learn-press-profile-dashboard">
                    <div class="profile-progress-status">
                      <div v-if="dashboard.monthlylyReport" class="row">
                        <div class="col-md-3 col-sm-6">
                          <div class="status-box success courses-completed">
                            <div class="status-number">
                              {{ dashboard.monthlylyReport.completedCourses }}
                            </div>
                            <h6 class="status-text">Courses Completed</h6>
                          </div>
                        </div>
                        <div class="col-md-3 col-sm-6">
                          <div class="status-box warning courses-in-progress">
                            <div class="status-number">
                              {{ dashboard.ongoingCourses.length }}
                            </div>
                            <h6 class="status-text">Courses In Progress</h6>
                          </div>
                        </div>
                        <div class="col-md-3 col-sm-6">
                          <div class="status-box info quizzes-completed">
                            <div class="status-number">
                              {{ dashboard.monthlylyReport.completedExams }}
                            </div>
                            <h6 class="status-text">Quizzes Completed</h6>
                          </div>
                        </div>
                        <div class="col-md-3 col-sm-6">
                          <div class="status-box error courses-completed">
                            <!--TODO: BURASI SERVİSE EKLENECEK Mİ?  -->
                            <div class="status-number">02</div>
                            <h6 class="status-text">Quizzes In Progress</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="profile-courses-progress">
                      <h3 class="title">Courses progress</h3>
                      <div
                        v-if="ongoingCourses.length > 0"
                        class="maxcoach-progress style-01"
                      >
                        <!-- Start Single Progress Charts -->
                        <!-- TODO: Burada ongoing courseslerin progressleri gösteriyorum. ongoing courses servisinden bu data gelmeli. -->
                        <div
                          v-for="(item, i) in ongoingCourses"
                          :key="i"
                          class="progress-charts mt-50 wow move-up"
                        >
                          <h6 class="title">
                            {{ item.courses[0].title }}
                          </h6>
                          <div class="progress">
                            <div
                              class="progress-bar wow fadeInLeft"
                              data-wow-duration="0.7s"
                              data-wow-delay=".5s"
                              role="progressbar"
                              style="width: 70%"
                              aria-valuenow="100"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >
                              <span class="percent-label">70%</span>
                            </div>
                          </div>
                        </div>
                        <!-- End Single Progress Charts -->
                      </div>
                    </div>
                  </div>
                </b-tab>

                <b-tab :active="isCoursesTabActive" title="Courses">
                  <div class="profile-content-courses lp-tab-menu">
                    <b-tabs pills card>
                      <b-tab title="Owned" active>
                        <div class="learn-press-subtab-content">
                          <!-- Courses Wrapper Start -->
                          <div
                            class="
                              row row-cols-lg-3 row-cols-md-2 row-cols-1
                              max-mb-n30
                            "
                          >
                            <!-- Course Start -->
                            <div
                              v-for="course in myCourses"
                              :key="course.id"
                              class="col max-mb-30"
                              data-aos="fade-up"
                            >
                              <n-link
                                :to="`/course/play-course?courseId=${course.courses[0].id}&subid=${course.subscription.id}&guid=${course.courses[0].courseguid}`"
                              >
                                <div class="course">
                                  <div class="thumbnail">
                                    <div class="image">
                                      <img
                                        :src="
                                          course.courses[0].featuredImage ||
                                          require('~/assets/img/course-placeholder.jpeg')
                                        "
                                        alt="Course Image"
                                      />
                                    </div>
                                  </div>
                                  <div class="info">
                                    <span
                                      v-if="
                                        course.courses[0].isPaid === 0 ||
                                        course.courses[0].isPaid === false
                                      "
                                      class="price"
                                      >Free</span
                                    >
                                    <span v-else class="price"
                                      >{{ course.courses[0].price }}
                                      {{
                                        course.courses[0].pricecurrency
                                      }}</span
                                    >
                                    <h3 class="title">
                                      <span>{{ course.courses[0].title }}</span
                                      >
                                    </h3>
                                    <ul class="meta">
                                      <li
                                        v-if="
                                          course.courses[0].courseLessonsCount
                                        "
                                      >
                                        <i class="far fa-file-alt"></i
                                        >{{
                                          course.courses[0].courseLessonsCount
                                        }}
                                        Lessons
                                      </li>
                                      <li>
                                        <i class="far fa-user-alt"></i
                                        >{{ course.courses[0].applyCount }}
                                        Students
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </n-link>
                            </div>
                          </div>
                          <!-- Courses Wrapper End -->
                        </div>
                      </b-tab>

                      <b-tab title="Purchased">
                        <div class="row">
                          <div class="col-12 scroll">
                            <table class="lp-list-table table">
                              <thead>
                                <tr>
                                  <th class="column-course">Course</th>
                                  <th class="column-date">Date</th>
                                  <th class="column-passing-grade">
                                    Passing Grade
                                  </th>
                                  <th class="column-status">Progress</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td class="column-course">
                                    <a href="JavaScript:Void(0);"
                                      >Database & SQL for Computer Science
                                    </a>
                                  </td>
                                  <td class="column-date">Dec 23, 2019</td>
                                  <td class="column-passing-grade">80%</td>
                                  <td class="column-status">
                                    <span class="result-percent">33.3%</span>
                                    <span class="lp-label label-in-progress"
                                      >In Progress
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="column-course">
                                    <a href=""
                                      >Introduction to Javascript for
                                      Beginners</a
                                    >
                                  </td>
                                  <td class="column-date">Dec 19, 2019</td>
                                  <td class="column-passing-grade">80%</td>
                                  <td class="column-status">
                                    <span class="result-percent">100%</span>
                                    <span class="lp-label label-passed"
                                      >Passed</span
                                    >
                                  </td>
                                </tr>
                                <tr>
                                  <td class="column-course">
                                    <a href="JavaScript:Void(0);">
                                      Academic Listening and Note-taking</a
                                    >
                                  </td>
                                  <td class="column-date">Dec 19, 2019</td>
                                  <td class="column-passing-grade">80%</td>
                                  <td class="column-status">
                                    <span class="result-percent">25%</span>
                                    <span class="lp-label label-failed"
                                      >Failed</span
                                    >
                                  </td>
                                </tr>
                              </tbody>
                              <tfoot>
                                <tr class="list-table-nav">
                                  <td colspan="2" class="nav-text">
                                    Displaying 1 to 3 of 3 courses.
                                  </td>
                                  <td colspan="2" class="nav-pages"></td>
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                        </div>
                      </b-tab>
                    </b-tabs>
                  </div>
                </b-tab>

                <b-tab :active="isQuizTabActive" title="Quizzes">
                  <QuizList></QuizList>
                </b-tab>
              </b-tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Learn Press Profile Section End -->
    <edit-profile ref="EditProfile"></edit-profile>
    <FooterStyleOne />
  </div>
</template>

<script>
import Course from '~/services/Course';
import jsCookie from 'js-cookie';
import EditProfile from '../../components/CustomComponents/EditProfile.vue';
import Profile from '~/services/Profile';
import Auth from '~/services/Auth';
import Dashboard from '~/services/Dashboard';

export default {
  components: {
    HeaderStyleTwo: () => import('@/components/HeaderStyleTwo'),
    OffCanvasMobileMenu: () => import('@/components/OffCanvasMobileMenu'),
    FooterStyleOne: () => import('@/components/FooterStyleOne'),
    EditProfile: () =>
      import('../../components/CustomComponents/EditProfile.vue'),
    QuizList: () =>
      import('../../components/CustomComponents/QuizList.vue'),
  },
  head() {
    return {
      title: this.config?.title + " - Profile",
    };
  },
  data() {
    return {
      myCourses: [],
      profile: {},
      dashboard: {},
      ongoingCourses: {},
    };
  },
  computed: {
    isCoursesTabActive() {
      if (this.$route.query.tab === 'courses') {
        return true;
      }
      return false;
    },
    isQuizTabActive() {
      if (this.$route.query.tab === 'quiz') {
        return true;
      }
      return false;
    },
  },
  mounted() {
    this.profile = JSON.parse(jsCookie.get('user'));
    this.getMyCourses();
    this.getDashboard();
    this.getOngoingCourses();
  },
  methods: {
    getOngoingCourses() {
      Course.getOngoingCourses(this.profile.accessToken)
        .then((res) => {
          this.ongoingCourses = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getDashboard() {
      await Dashboard.getDashboard(this.profile.accessToken)
        .then((res) => {
          this.dashboard = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMyCourses() {
      Course.getMyCourses(this.profile?.accessToken).then((response) => {
        this.myCourses = response.data.data;
      });
    },
    editProfile() {
      this.$refs.EditProfile.modalShow = true;
    },
    onPhotoClicked() {
      document.querySelector('#file').click();
    },
    async onFileUploaded(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      let formData = new FormData();
      formData.append('file', files[0]);

      let data = {
        photo: null,
      };

      await Profile.upload(this.profile.accessToken, formData)
        .then(async (result) => {
          if (result.status) {
            data.photo = result.data.url;
            await Profile.updatePhoto(this.profile.accessToken, data)
              .then(async (result) => {
                if (result.status) {
                  // this.$swal({
                  //   position: "center",
                  //   icon: "success",
                  //   title: "Photo Changed!",
                  //   showConfirmButton: false,
                  //   timer: 1500,
                  // });
                }
                await this.getUserDetails();
                setTimeout(() => {
                  window.location.reload();
                }, 1500);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // this.isLoading = false;
    },
    getUserDetails() {
      Auth.getUserDetails(this.profile.accessToken).then((res) => {
        if (res.data) {
          let user = {
            ...this.profile,
            ...res.data,
          };
          jsCookie.set('user', JSON.stringify(user));
          this.$store.commit('user/SET_USER', user);
          window.location.reload();
        }
      });
    },
  },
};
</script>

<style scoped>
.fa-pencil {
  font-size: 1.2rem;
  margin-left: 10px;
  cursor: pointer;
}
</style>
