<template>
  <div class="sidebar-widget-wrapper">
    <div class="sidebar-widget">
      <div class="sidebar-widget-content">
        <div class="sidebar-widget-search">
          <input
            @keydown.enter="getCoursesFromKey"
            v-model="searchKey"
            type="text"
            placeholder="Search..."
          />
          <button @click="getCoursesFromKey">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="sidebar-widget">
      <h3 class="sidebar-widget-title mb-2">Categories</h3>
      <div class="sidebar-widget-content">
        <ul class="sidebar-widget-list-post">
          <li
            @click="getCoursesFormCategory(cat)"
            v-for="cat in categories"
            :key="cat.id"
          >
            <div>{{ cat.name }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Course from "~/services/Course";
export default {
  data() {
    return {
      categories: [],
      searchKey: "",
    };
  },
  mounted() {
    this.getSidebarCategories();
  },
  methods: {
    getCoursesFormCategory(cat) {
      Course.getCoursesByCategory(this.user?.accessToken, cat.id)
        .then((res) => {
          this.$emit("setCoursesFromSidebar", res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCoursesFromKey() {
      Course.getCoursesByKey(this.user?.accessToken, this.searchKey)
        .then((res) => {
          this.$emit("setCoursesFromSidebar", res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getSidebarCategories() {
      Course.getSidebarCategory("SIDE_BAR_CATEGORIES")
        .then((res) => {
          this.categories = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
