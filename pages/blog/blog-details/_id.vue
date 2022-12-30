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
            <li>
              <n-link to="/blog?page=1">Blog</n-link>
            </li>
            <li class="current">{{post.title}}</li>
          </ul>
        </div>
      </div>

      <div class="page-title">
        <div class="container">
          <h1 class="title">{{post.title}}</h1>
        </div>
      </div>
    </div>

    <!-- Blog Section Start -->
    <div class="section-padding-bottom fix">
      <div class="container">
        <div class="row max-mb-n50">
          <div class="col-lg-8 col-12 order-lg-2 max-mb-50">
            <!-- Blog Wrapper Start -->
            <div class="row row-cols-1 no-gutters">
              <!-- Blog Start -->
              <div class="blog-3 blog-details col">
                <div class="thumbnail">
                  <img :src="post.featuredImage || require('~/assets/img/course-placeholder.jpeg')" alt="Blog Image" />
                </div>
                <div class="info">
                  <h3 class="title">{{post.title}}</h3>
                  <ul class="meta">
                    <li v-if="post.publisher">
                        <img
                          :src="post.publisher.image"
                          alt="image"
                          class="avatar"
                        />
                        {{post.publisher.title}}
                    </li>
                    <li>
                      <i class="far fa-calendar"></i>
                      {{ post.createdAt | DateTimeParse('mm.DD.yyyy') }}
                    </li>
                    <!-- <li>
                      <i class="far fa-eye"></i>
                      70 views
                    </li> -->
                  </ul>
                  <div class="desc">
                    <p v-html="post.content"></p>
                  </div>

                  <div
                    class="row justify-content-between align-items-center max-mt-50"
                  >
                    <div class="col-auto">
                      <!-- <div class="entry-post-tags">
                        <div class="tag-label">
                          <span class="tag-icon far fa-tags"></span>
                        </div>
                        <div class="tag">
                          <n-link to="">artist, </n-link>
                          <n-link to="">education</n-link>
                        </div>
                      </div> -->
                    </div>
                    <div class="col-auto">
                      <div class="post-share">
                        <span class="label">Share this post</span>
                        <div class="media">
                          <span class="icon"
                            ><i class="fas fa-share-alt"></i
                          ></span>
                          <div class="list">
                            <a href="#" target="_blank">
                              <i class="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" target="_blank">
                              <i class="fab fa-twitter"></i>
                            </a>
                            <a href="#" target="_blank">
                              <i class="fab fa-linkedin"></i>
                            </a>
                            <a href="#" target="_blank">
                              <i class="fab fa-tumblr-square"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Blog End -->

              <div v-if="post.publisher" class="entry-author">
                <div class="author-info">
                  <div class="author-avatar mr-2">
                    <img :src="post.publisher.image" alt="image" />
                    <!-- <div class="author-social-networks">
                      <div class="inner">
                        <a
                          class="hint--bounce hint--top hint--primary"
                          aria-label="Twitter"
                          href="https://twitter.com/"
                          target="_blank"
                        >
                          <i class="fab fa-twitter"></i>
                        </a>

                        <a
                          class="hint--bounce hint--top hint--primary"
                          aria-label="Facebook"
                          href="https://www.facebook.com/"
                          target="_blank"
                        >
                          <i class="fab fa-facebook-f"></i>
                        </a>

                        <a
                          class="hint--bounce hint--top hint--primary"
                          aria-label="Instagram"
                          href="https://www.instagram.com/"
                          target="_blank"
                        >
                          <i class="fab fa-instagram"></i>
                        </a>
                      </div>
                    </div> -->
                  </div>
                  <div class="author-description">
                    <h6 class="author-name">{{post.publisher.title}}</h6>
                    <!-- <div class="author-biographical-info">
                      Owen Christ is an author, blogger, and designer living in
                      a suburb of Washington, DC. When she’s not designing,
                      blogging, or writing, Owen can be found with her head in a
                      book or pinning like a madman.
                    </div> -->
                  </div>
                </div>
              </div>

              <div class="blog-nav-links">
                <div class="nav-list">
                  <div v-if="currentPostIndex !== 0 && posts[currentPostIndex - 1]" class="nav-item prev">
                    <div class="inner">
                      <n-link :to="`/blog/blog-details/${posts[currentPostIndex - 1].id}`">
                        <div
                          class="hover-bg has-thumbnail"
                          :style="{
                            backgroundImage: `url('${posts[currentPostIndex - 1].featuredImage || '/images/blog/blog-pagination-1.jpg'}')`,
                          }"
                        ></div>
                        <h6>{{posts[currentPostIndex - 1].title}}</h6>
                      </n-link>
                    </div>
                  </div>

                  <div v-if="currentPostIndex !== posts.length - 1 && posts[currentPostIndex + 1]" class="nav-item next">
                    <div class="inner">
                      <n-link :to="`/blog/blog-details/${posts[currentPostIndex + 1].id}`">
                        <div
                          class="hover-bg has-thumbnail"
                          :style="{
                            backgroundImage: `url('${posts[currentPostIndex + 1].featuredImage || '/images/blog/blog-pagination-2.jpg'}')`,
                          }"
                        ></div>
                        <h6>{{posts[currentPostIndex + 1].title}}</h6>
                      </n-link>
                    </div>
                  </div>
                </div>
              </div>

              <!-- <div class="comment-list-wrapper">
                <div class="row">
                  <div class="col-lg-12">
                    <h4 class="title">Comments <span>(3)</span></h4>
                  </div>
                  <div class="col-lg-12">
                    <ol class="comment-list">
                      <li class="comment">
                        <div class="comment-5">
                          <div class="comment-author vcard">
                            <img alt="" src="/images/comment/comment1.jpeg" />
                          </div>
                          <div class="comment-content">
                            <div class="meta">
                              <h6 class="fn">James Scott</h6>
                              <div class="comment-datetime">
                                November 13, 2018 at 4:50 am
                              </div>
                            </div>
                            <div class="comment-text">
                              <p>
                                Thanks for always keeping your HTML Template up
                                to date. Your level of support and dedication is
                                second to none.
                              </p>
                            </div>

                            <div class="comment-actions">
                              <div class="comment-datetime">
                                February 12, 2018 at 6:31 am
                              </div>
                              <span> | </span>
                              <a class="comment-reply-link" href="#">Reply</a>
                            </div>
                          </div>
                        </div>
                        <ol class="children">
                          <li class="comment">
                            <div class="comment-6">
                              <div class="comment-author vcard">
                                <img
                                  alt=""
                                  src="/images/comment/comment3.jpeg"
                                />
                              </div>
                              <div class="comment-content">
                                <div class="meta">
                                  <h6 class="fn">Harry Ferguson</h6>
                                  <div class="comment-datetime">
                                    February 13, 2019 at 4:51 am
                                  </div>
                                </div>
                                <div class="comment-text">
                                  <p>
                                    Thanks for always keeping your HTML Template
                                    up to date. Your level of support and
                                    dedication is second to none.
                                  </p>
                                </div>

                                <div class="comment-actions">
                                  <div class="comment-datetime">
                                    November 13, 2018 at 4:31 am
                                  </div>
                                  <span> | </span>
                                  <a class="comment-reply-link" href="#"
                                    >Reply</a
                                  >
                                </div>
                              </div>
                            </div>
                          </li>
                        </ol>
                      </li>
                    </ol>
                  </div>
                </div>
              </div> -->

              <!-- <div class="comment-form-wrap">
                <div class="comment-respond">
                  <h3 class="title">Leave your thought here</h3>
                  <p class="comment-notes">
                    <span id="email-notes"
                      >Your email address will not be published.</span
                    >
                    Required fields are marked <span class="required">*</span>
                  </p>
                  <form>
                    <div class="row">
                      <div class="col-md-6 col-12 max-mb-30">
                        <input
                          type="text"
                          placeholder="Your Name *"
                          name="name"
                        />
                      </div>
                      <div class="col-md-6 col-12 max-mb-30">
                        <input
                          type="email"
                          placeholder="Email *"
                          name="email"
                        />
                      </div>
                      <div class="col-12 max-mb-30">
                        <textarea
                          name="message"
                          placeholder="Your Comment"
                        ></textarea>
                      </div>
                      <div class="col-12">
                        <p
                          class="comment-form-cookies-consent justify-content-start text-left"
                        >
                          <input
                            id="comment-cookies-consent"
                            name="comment-cookies-consent"
                            type="checkbox"
                            value="yes"
                          />
                          <label for="comment-cookies-consent"
                            >Save my name, email, and website in this browser
                            for the next time I comment.</label
                          >
                        </p>
                      </div>
                      <div class="col-12 text-left">
                        <button
                          class="btn btn-primary btn-hover-secondary btn-width-180 btn-height-60"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div> -->
            </div>
            <!-- Blog Wrapper End -->
          </div>

          <div class="col-lg-4 col-12 order-lg-1 max-mb-50">
            <BlogSidebar :posts="posts"  />
          </div>
        </div>
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
    BlogSidebar: () => import("@/components/BlogSidebar"),
    FooterStyleOne: () => import("@/components/FooterStyleOne"),
  },
  name: "BlogDetail",
  async asyncData({ store, params }) {
    const currentBlogPost = await store.dispatch("blog/fetchBlogPost", params.id);
    await store.dispatch('blog/fetchBlogPostsByCategory', { page: '', limit: '', category: currentBlogPost.BlogCategories[0].id, q: '' })
  },
  computed: {
    post() {
      return this.$store.getters["blog/post"];
    },
    posts () {
      return this.$store.getters['blog/posts']
    },
    calculateHowManyDaysAgo() {
      const date = new Date(this.post.createdAt);
      const today = new Date();
      const diffTime = Math.abs(today - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    },
    getPublisherHeadline() {
      return this.post.publisher?.headline;
    },
    getPublisherTitle() {
      return this.post.publisher?.title || this.post.author.title;
    },
    isWriterSectionShow() {
      if (this.post.publisher || this.post.author) {
        return true;
      }
      return false;
    },
    currentPostIndex(){
        return this.posts.findIndex(post => post.id === this.post.id)
    }
  },
};
</script>
