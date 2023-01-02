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
      addClassName="light-color"
      addBackgroundColor="bg-navy-blue"
    />
  </div>
</template>

<script>
export default {
  components: {
    HeaderStyleTwo: () => import("@/components/HeaderStyleTwo"),
    OffCanvasMobileMenu: () => import("@/components/OffCanvasMobileMenu"),
    HeroBanner: () => import("@/components/HeroBanner"),
    OnlineCoachingLessons: () => import("@/components/OnlineCoachingLessons"),
    TeacherQuote: () => import("@/components/TeacherQuote"),
    CounterupWithTestimonial: () =>
      import("@/components/CounterupWithTestimonial"),
    VideoStyleOne: () => import("@/components/VideoStyleOne"),
    CurrentSignatureCourse: () => import("@/components/CurrentSignatureCourse"),
    BlogStyleOne: () => import("@/components/BlogStyleOne"),
    BrandLogoCarousel: () => import("@/components/BrandLogoCarousel"),
    FooterStyleOne: () => import("@/components/FooterStyleOne"),
  },

  head() {
    return {
      title: this.config?.title + ' - Learning Portal',
    };
  },
  async asyncData({ store }) {
    await store.dispatch("blog/fetchBlogPosts", {
      page: 1,
      limit: 3,
      q: "",
    });
  },
  created() {
     console.log(process.env.API_URL);
     console.log(process.env.CLIENT_AUTH_TOKEN)
  },
};
</script>
