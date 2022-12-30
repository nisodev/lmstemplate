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
            <li class="current">Login Register</li>
          </ul>
        </div>
      </div>

      <div class="page-title">
        <div class="container">
          <h1 class="title">Login Register</h1>
        </div>
      </div>
    </div>

    <!--Login Register section start-->
    <div class="login-register-section section-padding-bottom">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="row">
              <div class="col-xl-5 col-lg-6">
                <!-- Login Form Start -->
                <div class="login-form-wrapper">
                  <h3 class="title">Login</h3>
                  <div class="login-form">
                    <div class="single-input mb-30">
                      <label for="username">Username or email</label>
                      <input
                        v-model="loginForm.username"
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username or email"
                      />
                    </div>
                    <div class="single-input mb-30">
                      <label for="password">Password</label>
                      <input
                        type="password"
                        v-model="loginForm.password"
                        id="password"
                        name="password"
                        placeholder="Password"
                      />
                    </div>
                    <div class="single-input mb-30">
                      <div class="row">
                        <div class="col-sm-6 remember-me-wrap">
                          <div class="checkbox-input">
                            <input
                              type="checkbox"
                              name="login-form-remember"
                              id="login-form-remember"
                            />
                            <label for="login-form-remember">Remember me</label>
                          </div>
                        </div>
                        <div class="col-sm-6 lost-your-password-wrap">
                          <button class="lost-your-password">
                            Lost your password?
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="single-input">
                      <button
                        @click="login"
                        class="btn btn-primary btn-hover-secondary btn-width-100"
                      >
                        Log In
                      </button>
                    </div>
                  </div>
                </div>
                <!-- Login Form End -->
              </div>
              <div class="col-xl-6 offset-xl-1 col-lg-6">
                <!-- Register Form Start -->
                <div class="login-form-wrapper mt-sm-50 mt-xs-50">
                  <h3 class="title">Register</h3>
                  <div class="register-form">
                    <div class="single-input mb-30">
                      <label for="usernameOne">Full Name</label>
                      <input
                        v-model="registerForm.fullname"
                        type="text"
                        id="usernameOne"
                        name="username"
                        placeholder="Full Name"
                      />
                    </div>
                    <div class="single-input mb-30">
                      <label for="email">Email</label>
                      <input
                        v-model="registerForm.email"
                        type="text"
                        id="email"
                        name="username"
                        placeholder="Email"
                      />
                    </div>
                    <div class="single-input mb-30">
                      <label for="phone">Phone</label>
                      <input
                        v-model="registerForm.mobile"
                        type="text"
                        id="phone"
                        name="username"
                        placeholder="Phone"
                      />
                    </div>
                    <div class="single-input mb-30">
                      <label for="passwordOne">Password</label>
                      <input
                        v-model="registerForm.password"
                        type="password"
                        id="passwordOne"
                        name="password"
                        placeholder="Password"
                      />
                      <p class="description">
                        The password must be at least twelve characters long,
                        contain upper and lower case letters, contain numbers,
                        contain symbols like ! " ? $ % ^ &amp;
                      </p>
                    </div>
                    <div class="single-input">
                      <button
                        @click="register"
                        class="btn btn-primary btn-hover-secondary btn-width-100"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </div>
                <!-- Register Form End -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--Login Register section end-->

    <FooterStyleOne />
  </div>
</template>

<script>
import eventData from "~/data/event";
import Auth from "~/services/Auth";
import jsCookie from "js-cookie";
export default {
  components: {
    HeaderStyleTwo: () => import("@/components/HeaderStyleTwo"),
    OffCanvasMobileMenu: () => import("@/components/OffCanvasMobileMenu"),
    EventItemGridStyle: () => import("@/components/EventItemGridStyle"),
    FooterStyleOne: () => import("@/components/FooterStyleOne"),
  },

  data() {
    return {
      registerForm: {},
      loginForm: {},
      eventData,
      options: [
        "Popularity",
        "Latest",
        "Price: low to high",
        "Price: high to low",
      ],
      placeholderItem: "Default",
    };
  },
  methods: {
    login() {
      Auth.login(this.loginForm)
        .then(async (res) => {
          if (res.status) {
            //GET USER INFO
            await Auth.getUserDetails(res.data.accessToken)
              .then((result) => {
                let loginResult = res.data;
                let user = {
                  ...loginResult,
                  ...result.data,
                };
                jsCookie.set("user", JSON.stringify(user));
                this.$store.commit("user/SET_USER", user);
              })
              .catch((err) => {
                console.log(err);
              });

            //REDIRECT INDEX
            this.$swal({
              position: "center",
              icon: "success",
              background: this.$colorMode.value === "dark" ? "#1a1a1a" : "#fff",
              title: "Successfully logged in!",
              timer: 2000,
              showConfirmButton: false,
              willClose: () => {
                if (this.$route.query.redirect) {
                  this.$router.push(this.$route.query.redirect);
                } else {
                  this.$router.push("/");
                }
              },
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$swal({
            position: "center",
            icon: "warning",
            background: this.$colorMode.value === "dark" ? "#1a1a1a" : "#fff",
            title: err.response.data.message,
            timer: 2000,
            showConfirmButton: false,
          });
        });
    },
    register() {
      Auth.register(this.registerForm)
        .then((res) => {
          if (res.status) {
            this.$swal({
              position: "center",
              icon: "success",
              background: this.$colorMode.value === "dark" ? "#1a1a1a" : "#fff",
              title: "Regiser Success!",
              timer: 2000,
              showConfirmButton: false,
            });
            this.registerForm = {};
          }
        })
        .catch((err) => {
          console.log(err);
          this.$swal({
            position: "center",
            icon: "warning",
            background: this.$colorMode.value === "dark" ? "#1a1a1a" : "#fff",
            title: "An error occurred!",
            timer: 2000,
            showConfirmButton: false,
          });
        });
    },
  },

  computed: {
    getSelectorPlaceholder: function () {
      return this.placeholderItem;
    },
  },

  head() {
    return {
      title: "Login Register",
    };
  },
};
</script>
