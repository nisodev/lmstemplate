<template>
  <div class="footer-section" :class="addBackgroundColor">
    <div class="container">
      <div class="row">
        <div class="col-xl-6 col-md-5 max-mb-50">
          <div class="footer-widget" :class="addClassName">
            <h4 class="footer-widget-title">
              Address
            </h4>
            <div class="footer-widget-content">
              <div class="content">
                <p>Your address goes here</p>
                <p>0123456789 (9am - 5pm EST, Monday - Friday)</p>
                <p>
                  <a href="mailto:info@example.com">info@example.com</a>
                </p>
              </div>
              <div class="footer-social-inline">
                <a href="https://www.facebook.com/" target="_blank">
                  <i class="fab fa-facebook-square" />
                </a>
                <a href="https://twitter.com/" target="_blank">
                  <i class="fab fa-twitter" />
                </a>
                <a href="https://www.instagram.com/" target="_blank">
                  <i class="fab fa-instagram" />
                </a>
                <a href="https://www.linkedin.com/" target="_blank">
                  <i class="fab fa-linkedin" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-md-4 col-sm-7 max-mb-50">
          <!-- <div class="footer-widget" :class="addClassName">
                        <h4 class="footer-widget-title">Explore</h4>
                        <div class="footer-widget-content">
                            <ul class="column-2">
                                <li>
                                    <n-link to="">Start here</n-link>
                                </li>
                                <li>
                                    <n-link to="">Success story</n-link>
                                </li>
                                <li>
                                    <n-link to="/blog/blog-grid">Blog</n-link>
                                </li>
                                <li>
                                    <n-link to="/course/courses-grid-one">Courses</n-link>
                                </li>
                                <li>
                                    <n-link to="/about-us-one">About us</n-link>
                                </li>
                                <li>
                                    <n-link to="/contact-us">Contact us</n-link>
                                </li>
                            </ul>
                        </div>
                    </div> -->
        </div>

        <div class="col-xl-3 col-md-3 col-sm-5 col-12 max-mb-50">
          <div class="footer-widget" :class="addClassName">
            <h4 class="footer-widget-title">
              Information
            </h4>
            <div class="footer-widget-content">
              <ul>
                <!-- <li>
                                    <n-link to="">Membership</n-link>
                                </li>
                                <li>
                                    <n-link to="">Purchase guide</n-link>
                                </li> -->
                <li>
                  <n-link to="/privacy-policy">
                    Privacy policy
                  </n-link>
                </li>
                <li>
                  <n-link to="terms-of-service">
                    Terms of service
                  </n-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Copyright Start -->
      <div class="row max-mt-20">
        <div class="col">
          <p v-if="company" class="copyright">
            &copy; {{ new Date().getFullYear() }} <b>{{ company }}</b>
          </p>
        </div>
      </div>
      <!-- Footer Copyright End -->
    </div>

    <client-only>
      <back-to-top class="scroll-top" bottom="30px">
        <i class="arrow-top fal fa-long-arrow-up" />
        <i class="arrow-bottom fal fa-long-arrow-up" />
      </back-to-top>
    </client-only>
  </div>
</template>

<script>
export default {
  props: [
    'addClassName',
    'addBackgroundColor'
  ],
  computed: {
    company () {
      return this.$store.getters['config/getConfig']?.title || ''
    }
  }
}
</script>
