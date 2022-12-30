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
            <li class="current">Terms Of Services</li>
          </ul>
        </div>
      </div>

      <div class="page-title">
        <div class="container">
          <h1 class="title">Terms Of Services</h1>
        </div>
      </div>
    </div>

    <!-- Blog Section Start -->
    <div class="section-padding-bottom fix">
      <div class="container">
        <div class="row max-mb-n50">
          <div class="col-lg-12 col-12 order-lg-2 max-mb-50">
            <!-- Blog Wrapper Start -->
            <div class="row row-cols-1 no-gutters">
              <!-- Blog Start -->
              <div class="blog-3 blog-details col">
                <div class="info">
                  <div class="desc">
                    Terms of service content here.
                    <!-- <p v-html="pageData.content"></p> -->
                  </div>
                </div>
              </div>
            </div>
            <!-- Blog Wrapper End -->
          </div>
        </div>
      </div>
    </div>
    <!-- Blog Section End -->

    <FooterStyleOne />
  </div>
</template>

<script>
import blogData from '~/data/blog';
import ContentPages from '~/services/ContentPages';
export default {
  components: {
    HeaderStyleTwo: () => import('@/components/HeaderStyleTwo'),
    OffCanvasMobileMenu: () => import('@/components/OffCanvasMobileMenu'),
    BlogSidebar: () => import('@/components/BlogSidebar'),
    FooterStyleOne: () => import('@/components/FooterStyleOne'),
  },

  data() {
    return {
      blogData,
    };
  },

  // asyncData({ error }) {
  //   return ContentPages.getPage('TERMS_OF_SERVICE')
  //     .then((res) => {
  //       return { pageData: res.data.clientpage };
  //     })
  //     .catch((e) => {
  //       error({ statusCode: 404, message: 'Post not found' });
  //     });
  // },

  head() {
    return {
      title: this.config?.title + " - Terms of Service",
    };
  },
};
</script>
