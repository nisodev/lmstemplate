<template>
  <div class="main-container">
    <HeaderStyleTwo />

    <OffCanvasMobileMenu />

    <div class="page-title-section section-padding-top-0 py-0">
      <div class="page-breadcrumb">
        <div class="container">
          <ul class="breadcrumb">
            <li>
              <n-link to="/">Home</n-link>
            </li>
            <li class="current">Blog</li>
          </ul>
        </div>
      </div>

      <div class="page-title">
        <div class="container">
          <h1 class="title">Blog </h1>
        </div>
      </div>
    </div>

    <div class="container">
        <div class="py-4">
            
        </div>
    </div>

    <!-- Blog Section Start -->
    <div class="section-padding-bottom">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-12  max-mb-50">
           <Categories @setPage="setPage"></Categories>
          </div>
          <div class="row col-lg-8">
          <div
            class="col-lg-6 max-mb-30"
            v-for="blog in posts"
            :key="blog.id"
          >
            <BlogPostCaptionBottom :blog="blog" />
          </div>
          </div>
        </div>

        <!-- Pagination Start -->
        <div class="row max-mt-50">
          <div class="col">
            <paginate
            v-model="pagination.page"
              :page-count="pageCount"
              :page-range="3"
              :margin-pages="2"
              :click-handler="changePage"
              :prev-text="'Prev'"
              :next-text="'Next'"
              :container-class="'pagination center'"
              :page-class="'page-item'"
            >
            </paginate>
          </div>
        </div>
        <!-- Pagination End -->
      </div>
    </div>
    <!-- Blog Section End -->

    <FooterStyleOne />
  </div>
</template>

<script>

export default {
  components: {
    HeaderStyleTwo: () => import("@/components/HeaderStyleTwo"),
    OffCanvasMobileMenu: () => import("@/components/OffCanvasMobileMenu"),
    BlogPostCaptionBottom: () => import("@/components/BlogPostCaptionBottom"),
    FooterStyleOne: () => import("@/components/FooterStyleOne"),
    Categories: () => import("@/components/CustomComponents/Blog/Categories")
  },
  async asyncData ({ store, query }) {
    const queryString = {
      page: query.page || 1,
      category: query.category || null,
      q: query.q || ''
    }
    await store.dispatch('blog/fetchCategories')
    if (queryString.category) {
      await store.dispatch('blog/fetchBlogPostsByCategory', { page: queryString.page, limit: 6, category: queryString.category, q: queryString.q })
    } else {
      await store.dispatch('blog/fetchBlogPosts', { page: queryString.page, limit: 6, q: queryString.q })
    }
  },
  data () {
    return {
      searchQuery: '',
      pagination: {
        page: null,
        limit: 6,
        total: 0
      }
    }
  },
  head() {
    return {
      title: this.config?.title + " - Blog",
    };
  },
  computed: {
    posts () {
      return this.$store.getters['blog/posts']
    },
    headerPost () {
      return this.$store.getters['blog/headerPost']
    },
    category () {
      return this.$store.getters['blog/category']
    },
    pageCount () {
      const size = this.$store.getters['blog/postSize']
      return Math.ceil(size / this.pagination.limit)
    },
    categories () {
      return this.$store.getters['blog/categories']
    },
  },
  created () {
    this.pagination.total = this.$store.getters['blog/postSize']
    this.setPaginationFromQuery()
    this.setSearchQueryFromQuery()
    this.setCategoryFromQuery()
  },
  methods: {
    changePage (page) {
      this.pagination.page = page
      if (this.$route.query.category) {
        this.$store.dispatch('blog/fetchBlogPostsByCategory', { page, limit: 6, category: this.category.id, q: this.$route.query.q || '' })
        this.$router.push(`blog?page=${page}&category=${this.$route.query.category}&q=${this.$route.query.q || ''}`)
      } else {
        this.$router.push('blog?page=' + page)
        this.$store.dispatch('blog/fetchBlogPosts', { page, limit: 6 })
      }
    },
    setPage ($event) {
      this.searchQuery = ''
      this.pagination.page = $event
    },
    setPaginationFromQuery () {
      this.pagination.page = Number(this.$route.query.page) || 1
    },
    setSearchQueryFromQuery () {
      this.searchQuery = this.$route.query.q || ''
    },
    searchPosts ($event) {
      this.pagination.page = 1
      if ($event !== '') {
        if (this.$route.query.category) {
          this.$router.push(`blog?page=1&category=${this.$route.query.category}&q=${$event.target.value}`)
          this.$store.dispatch('blog/fetchBlogPostsByCategory', { page: 1, limit: 6, category: this.$route.query.category, q: $event.target.value })
        } else {
          this.$router.push('?page=1&q=' + $event.target.value)
          this.$store.dispatch('blog/fetchBlogPosts', { page: 1, limit: 6, q: $event.target.value })
        }
      }
    },
    setCategoryFromQuery(){
      const category = this.categories.find(category => category.id === parseInt(this.$route.query.category))
        this.$store.commit('blog/SET_CATEGORY', category)
    }
  }
}


</script>
