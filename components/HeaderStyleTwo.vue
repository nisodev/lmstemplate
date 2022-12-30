<template>
  <header
    class="header-section header-shadow"
    :class="{ 'is-sticky': isSticky }"
  >
    <div class="header-inner">
      <div class="container position-relative">
        <div class="row justify-content-between align-items-center">
          <!-- Header Logo Start -->
          <div class="col-xl-3 col-auto">
            <div class="header-logo">
              <n-link to="/">
                <img
                  class="dark-logo"
                  :src="logo"
                />
              </n-link>
            </div>
          </div>
          <!-- Header Logo End -->

          <!-- Header Main Menu Start -->
          <div class="col d-none d-xl-block position-static">
            <Navigation />
          </div>
          <!-- Header Main Menu End -->

          <!-- Header Right Start -->
          <div class="col-xl-3 col-auto">
            <div class="header-right">
              <div class="inner">
                <ColorMode />

                <!-- Header Login Start -->
                <div class="header-login">
                  <n-link :to="user ? '/course/profile' : '/login-register'">
                    <i class="far fa-user-circle"></i>
                  </n-link>
                </div>

                <div v-if="user" @click="logout" class="header-login">
                  <n-link to="/">
                    <i class="fas fa-sign-out"></i>
                  </n-link>
                </div>

                <!-- Header Login End -->

                <!-- Header Search Start -->
                <div class="header-search">
                  <button
                    class="header-search-toggle"
                    @click="isHidden = !isHidden"
                  >
                    <i class="far fa-search"></i>
                  </button>
                  <div class="header-search-form" v-show="!isHidden">
                    <input
                      v-model="searchKey"
                      type="text"
                      placeholder="Search..."
                      @keydown.enter="search"
                    />
                    <button @click="search">
                      <i class="fas fa-search"></i>
                    </button>
                  </div>
                </div>
                <!-- Header Search End -->

                <!-- Header Mobile Menu Toggle Start -->
                <div class="header-mobile-menu-toggle d-xl-none ml-sm-2">
                  <button
                    class="toggle"
                    @click="mobiletoggleClass('addClass', 'show-mobile-menu')"
                  >
                    <i class="icon-top"></i>
                    <i class="icon-middle"></i>
                    <i class="icon-bottom"></i>
                  </button>
                </div>
                <!-- Header Mobile Menu Toggle End -->
              </div>
            </div>
          </div>
          <!-- Header Right End -->
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import jsCookie from "js-cookie";
import { mapGetters } from "vuex";
export default {
  components: {
    Navigation: () => import("@/components/Navigation"),
    ColorMode: () => import("@/components/ColorMode"),
  },

  data() {
    return {
      isSticky: false,
      isHidden: true,
      searchKey: "",
    };
  },
  computed: {
    ...mapGetters({
      user: "user/getUser",
      logo: "config/getLogo"
    }),
  },
  mounted() {
    window.addEventListener("scroll", () => {
      let scrollPos = window.scrollY;
      if (scrollPos >= 200) {
        this.isSticky = true;
      } else {
        this.isSticky = false;
      }
    });
  },

  methods: {
    search() {
      if (this.searchKey !== "") {
        this.$router.push(`/course/courses-grid-one?key=${this.searchKey}`);
      }
    },
    logout() {
      jsCookie.remove("user");
      this.$store.commit("user/SET_USER", undefined);
      this.$swal({
        title: "Logout Successful",
        timer: 2000,
        position: "center",
        icon: "success",
        background: this.$colorMode.value === "dark" ? "#1a1a1a" : "#fff",
        showConfirmButton: false,
      });
    },
    // offcanvas mobilemenu
    mobiletoggleClass(addRemoveClass, className) {
      const el = document.querySelector("#offcanvas-menu");
      if (addRemoveClass === "addClass") {
        el.classList.add(className);
      } else {
        el.classList.remove(className);
      }
    },
  },
};
</script>
