<template>
  <div class="main-container home-one-wrapper">
    <HeaderStyleTwo class="header-fluid" />

    <OffCanvasMobileMenu />

    <HeroBanner />

    <OnlineCoachingLessons />

    <!-- <TeacherQuote /> -->

    <!-- <CounterupWithTestimonial /> -->

    <!-- <VideoStyleOne /> -->

    <BlogStyleOne />

    <!-- <BrandLogoCarousel /> -->

    <FooterStyleOne
      add-class-name="light-color"
      add-background-color="bg-navy-blue"
    />
  </div>
</template>

<script>
export default {
  components: {
    HeaderStyleTwo: () => import('@/components/HeaderStyleTwo'),
    OffCanvasMobileMenu: () => import('@/components/OffCanvasMobileMenu'),
    HeroBanner: () => import('@/components/HeroBanner'),
    OnlineCoachingLessons: () => import('@/components/OnlineCoachingLessons'),
    BlogStyleOne: () => import('@/components/BlogStyleOne'),
    FooterStyleOne: () => import('@/components/FooterStyleOne')
  },
  async asyncData ({ store }) {
    try {
      await store.dispatch('blog/fetchBlogPosts', {
        page: 1,
        limit: 3,
        q: ''
      })
    } catch (error) {
      console.log(error)
    }
  },

  head () {
    return {
      title: this.config?.title + ' - Learning Portal'
    }
  }
}
</script>
