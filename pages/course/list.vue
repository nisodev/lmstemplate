<template>
  <div class="main-container">
    <HeaderStyleTwo />

    <OffCanvasMobileMenu />

    <div class="page-title-section section-padding-top-0">
      <div class="page-breadcrumb">
        <div class="container">
          <ul class="breadcrumb">
            <li>
              <n-link to="/">Home</n-link>
            </li>
            <li class="current">Courses</li>
          </ul>
        </div>
      </div>

      <div class="page-title">
        <div class="container">
          <h1 class="title">Courses</h1>
        </div>
      </div>
    </div>

    <div class="section-padding-bottom">
      <div class="container">
        <div class="row max-mb-n50">
          <div class="col-lg-3 col-12 max-mb-50">
            <CourseCategories @setCoursesFromSidebar="setCoursesFromSidebar" />
          </div>
          <!-- Courses Wrapper Start -->
          <div class="col-lg-9 col-12 max-mb-50">
            <div class="row row-cols-lg-3 row-cols-md-2 row-cols-1 max-mb-n30">
              <div
                class="col max-mb-30"
                v-for="course in courses"
                :key="course.id"
              >
                <CourseItem :course="course" />
              </div>
            </div>
          </div>
          <div class="col-lg-9 col-12 text-right">
            <div class="row max-mt-50">
              <div class="col text-center">
                <button
                  class="btn btn-outline-primary load-more-btn"
                  @click="loadMore"
                >
                  Load More
                  <i class="fal fa-redo ml-3"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <FooterStyleOne />
  </div>
</template>

<script>
import Course from '~/services/Course';
export default {
  head() {
    return {
      title: this.config?.title + ' - Courses',
    };
  },
  components: {
    HeaderStyleTwo: () => import('@/components/HeaderStyleTwo'),
    OffCanvasMobileMenu: () => import('@/components/OffCanvasMobileMenu'),
    FooterStyleOne: () => import('@/components/FooterStyleOne'),
    CourseCategories: () =>
      import('@/components/CustomComponents/CourseCategories'),
  },
  mounted() {
    Course.getCoursesByKey(
      this.user?.accessToken,
      this.$route.query.key ? this.$route.query.key : ''
    )
      .then((res) => {
        this.courses = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      courses: [],
      placeholderItem: 'Default',
      currentItem: 6,
    };
  },

  computed: {
    getSelectorPlaceholder: function () {
      return this.placeholderItem;
    },
  },

  methods: {
    loadMore() {
      this.currentItem += 3;
    },
    setCoursesFromSidebar(courses) {
      this.courses = courses;
    },
  },
};
</script>

<style lang="scss">
.vs__dropdown-toggle {
  background-color: #f5f5f5;
  border-color: #f5f5f5;
}
.vs__actions {
  padding: 4px 15px 0 3px;
}
.v-select {
  width: 300px;
  @media #{$large-mobile} {
    width: 100%;
  }
}
.vs__search,
.vs__search:focus {
  width: 100%;
  padding: 0;
  margin: 0;
  border: none;
}
.vs__search {
  flex: 1 0;
  background-color: transparent !important;
  border: none;
  height: 50px;
}
input.vs__search {
  min-height: 0;
  border: none !important;
  padding: 0;
}
.vs__dropdown-toggle {
  padding: 0;
}
.vs__selected {
  margin: 0;
  padding: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.vs__dropdown-menu {
  padding: 0;
  li {
    padding: 10px;
    &:hover,
    .active {
      background-color: $primary;
    }
  }
}
.vs__selected-options {
  padding: 0 15px;
}
.vs__dropdown-option--highlight {
  background: $primary;
}
</style>
