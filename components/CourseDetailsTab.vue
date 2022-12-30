<template>
  <div class="section">
    <div class="container">
      <div class="row max-mb-n50">
        <div class="col-lg-8 col-12 order-lg-1 max-mb-50">
          <!-- Course Details Wrapper Start -->
          <div class="course-details-wrapper">
            <b-tabs v-if="courseDetails" pills card>
              <b-tab ab title="Overview" active>
                <div class="course-overview">
                  <h3 class="title">Course Description</h3>
                  <p v-html="courseDetails.courseDescription"></p>
                  <div class="overview-course-video">
                    <img :src="courseDetails.featuredImage" alt="" srcset="" />
                  </div>

                  <h3 class="title">What you’ll learn in this course?</h3>
                  <p v-html="courseDetails.courseLearningOutcomes"></p>
                  <p v-html="courseDetails.courseGoals"></p>
                 

                </div>
              </b-tab>
              <b-tab v-if="courseDetails.presenterName" title="Instructor">
                <CourseInstructor :courseDetails="courseDetails" />
              </b-tab>
              <b-tab title="Reviews">
                <div class="course-reviews">
                  <div class="course-rating">
                    <h3 class="title">Reviews</h3>
                    <div class="course-rating-content">
                      <div class="average-rating">
                        <p class="rating-title secondary-color">
                          Average Rating
                        </p>
                        <div class="rating-box">
                          <div class="average-value primary-color">4.50</div>
                          <div class="review-star">
                            <div class="tm-star-rating">
                              <span class="fas fa-star"></span>
                              <span class="fas fa-star"></span>
                              <span class="fas fa-star"></span>
                              <span class="fas fa-star"></span>
                              <span class="fas fa-star-half-alt"></span>
                            </div>
                          </div>
                          <div class="review-amount">(2 ratings)</div>
                        </div>
                      </div>
                      <div class="detailed-rating">
                        <p class="rating-title secondary-color">
                          Detailed Rating
                        </p>
                        <div class="rating-box">
                          <div class="rating-rated-item">
                            <div class="rating-point">
                              <div class="tm-star-rating">
                                <span class="fas fa-star"></span>
                                <span class="fas fa-star"></span>
                                <span class="fas fa-star"></span>
                                <span class="fas fa-star"></span>
                                <span class="fas fa-star"></span>
                              </div>
                            </div>
                            <div class="rating-progress">
                              <div class="single-progress-bar">
                                <div class="progress">
                                  <div
                                    class="progress-bar"
                                    role="progressbar"
                                    style="width: 90%"
                                    aria-valuenow="90"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  ></div>
                                </div>
                              </div>
                            </div>
                            <div class="rating-count">1</div>
                          </div>

                          <div class="rating-rated-item">
                            <div class="rating-point">
                              <div class="tm-star-rating">
                                <span class="fas fa-star"></span>
                                <span class="fas fa-star"></span>
                                <span class="fas fa-star"></span>
                                <span class="fas fa-star"></span>
                                <span class="far fa-star"></span>
                              </div>
                            </div>
                            <div class="rating-progress">
                              <div class="single-progress-bar">
                                <div class="progress">
                                  <div
                                    class="progress-bar"
                                    role="progressbar"
                                    style="width: 50%"
                                    aria-valuenow="50"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  ></div>
                                </div>
                              </div>
                            </div>
                            <div class="rating-count">1</div>
                          </div>

                          <div class="rating-rated-item">
                            <div class="rating-point">
                              <div class="tm-star-rating">
                                <span class="fas fa-star"></span>
                                <span class="fas fa-star"></span>
                                <span class="fas fa-star"></span>
                                <span class="far fa-star"></span>
                                <span class="far fa-star"></span>
                              </div>
                            </div>
                            <div class="rating-progress">
                              <div class="single-progress-bar">
                                <div class="progress">
                                  <div
                                    class="progress-bar"
                                    role="progressbar"
                                    style="width: 0%"
                                    aria-valuenow="0"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  ></div>
                                </div>
                              </div>
                            </div>
                            <div class="rating-count">0</div>
                          </div>

                          <div class="rating-rated-item">
                            <div class="rating-point">
                              <div class="tm-star-rating">
                                <span class="fas fa-star"></span>
                                <span class="fas fa-star"></span>
                                <span class="far fa-star"></span>
                                <span class="far fa-star"></span>
                                <span class="far fa-star"></span>
                              </div>
                            </div>
                            <div class="rating-progress">
                              <div class="single-progress-bar">
                                <div class="progress">
                                  <div
                                    class="progress-bar"
                                    role="progressbar"
                                    style="width: 0%"
                                    aria-valuenow="0"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  ></div>
                                </div>
                              </div>
                            </div>
                            <div class="rating-count">0</div>
                          </div>

                          <div class="rating-rated-item">
                            <div class="rating-point">
                              <div class="tm-star-rating">
                                <span class="fas fa-star"></span>
                                <span class="far fa-star"></span>
                                <span class="far fa-star"></span>
                                <span class="far fa-star"></span>
                                <span class="far fa-star"></span>
                              </div>
                            </div>
                            <div class="rating-progress">
                              <div class="single-progress-bar">
                                <div class="progress">
                                  <div
                                    class="progress-bar"
                                    role="progressbar"
                                    style="width: 0%"
                                    aria-valuenow="0"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  ></div>
                                </div>
                              </div>
                            </div>
                            <div class="rating-count">0</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="course-reviews-area">
                    <div v-if="user" class="pt-4">
                      <div class="rating-wrapper py-4">
                        <b-form-rating size="lg" no-border v-model="rate"></b-form-rating>
                      </div>
                    <h3 class="title">Write Your Reviews</h3>
                      <textarea v-model="comment" name="" id="" cols="30" rows="5"></textarea>
                      <div>
                        <button @click="sendReview" class="btn btn-primary btn-hover-secondary btn-width-100">Share</button>
                      </div>
                    </div>
                    <ul class="course-reviews-list">
                      <li class="review">
                        <div class="review-container">
                          <div class="review-author">
                            <img
                              src="/images/review-author/author1.jpeg"
                              alt="author"
                            />
                          </div>
                          <div class="review-content">
                            <h4 class="title">ednawatson</h4>
                            <div
                              class="review-stars-rated"
                              title="5 out of 5 stars"
                            >
                              <div class="review-stars empty"></div>
                            </div>
                            <h5 class="review-title">Cover all my needs</h5>
                            <div class="review-text">
                              The course identify things we want to change and
                              then figure out the things that need to be done to
                              create the desired outcome. The course helped me
                              in clearly define problems and generate a wider
                              variety of quality solutions. Support more
                              structures analysis of options leading to better
                              decisions.
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </b-tab>
            </b-tabs>
          </div>
          <!-- Course Details Wrapper End -->
        </div>

        <div class="col-lg-4 col-12 order-lg-2 max-mb-50">
          <CourseDetailsSidebar :courseDetails="courseDetails" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    courseDetails: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      rate: 0,
      comment: ''
    }
  },
  components: {
    CourseDetailsSidebar: () => import("@/components/CourseDetailsSidebar"),
    CourseInstructor: () => import("@/components/CourseInstructor"),
  },
  methods: {
    async sendReview() {
      let data = {
        subid: Number(this.$route.query.id),
        rate: this.rate,
        title: "",
        comment: this.comment,
        name: this.user.fullname,
        photo: this.user.photo === "" ? null : this.user.photo,
        course: this.courseDetails.courseguid,
      };

      const res = await this.$store.dispatch("course/sendReview", data);
      console.log(res);
    }
  },
};
</script>
