<template>
<div class="sidebar-widget-wrapper">
        <div class="sidebar-widget">
            <h3 class="sidebar-widget-title mb-2">Categories</h3>
            <div class="sidebar-widget-content">
                <ul class="sidebar-widget-list-post">
                  <li :style="category.id === '' || !category.id ? 'font-weight: bold' : ''" class="cursor-pointer font-size-2" @click="getPostsByCategory()">All</li>
                    <li v-for="item in categories" :key="item.id">
                        <span :style="category.id === item.id ? 'font-weight: bold' : ''" class="cursor-pointer font-size-2" @click="getPostsByCategory(item)">{{ item.title }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'BlogCategories',
  computed: {
    categories() {
      return this.$store.getters['blog/categories']
    },
    category () {
      return this.$store.getters['blog/category'] || {}
    },
  },
  methods: {
     getPostsByCategory (category = {id: ''}) {
      this.$emit('setPage', 1)
      this.$store.commit('blog/SET_CATEGORY', category)
      this.$router.push(`/blog?page=1&category=${category.id}`)
      this.$store.dispatch('blog/fetchBlogPostsByCategory', { page: 1, limit: 6, category: category.id })
    },
  },
}
</script>
