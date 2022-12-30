<template>
  <b-modal
    title="Edit Profile"
    :header-bg-variant="$colorMode.value === 'dark' ? 'dark' : 'light'"
    :body-bg-variant="$colorMode.value === 'dark' ? 'dark' : 'light'"
    :footer-bg-variant="$colorMode.value === 'dark' ? 'dark' : 'light'"
    :footer-text-variant="$colorMode.value === 'dark' ? 'dark' : 'light'"
    v-model="modalShow"
    @ok="updateProfile"
  >
    <label for="email">Email</label>
    <input
      v-model="profile.username"
      type="text"
      id="email"
      name="email"
      disabled
      placeholder="Email"
    />
    <label class="mt-2" for="fullname">Fullname</label>
    <input
      v-model="profile.fullname"
      type="text"
      id="fullname"
      name="fullname"
      placeholder="Fullname"
    />
    <label class="mt-2" for="Mobile">Mobile</label>
    <input
      v-model="profile.mobile"
      type="text"
      id="mobile"
      name="mobile"
      placeholder="Mobile"
    />
    <div
      @click="passwordArea = !passwordArea"
      class="mt-3 d-flex justify-content-end"
    >
      <a>Update Password</a>
    </div>
    <b-collapse v-model="passwordArea">
      <label class="mt-2" for="Mobile">Old Password</label>
      <input
        v-model="password.oldPassword"
        type="password"
        id="old-password"
        name="old-password"
        placeholder="Old Password"
      />
      <label class="mt-2" for="new-password">New Password</label>
      <input
        v-model="password.newPassword"
        type="password"
        id="new-password"
        name="new-password"
        placeholder="New Password"
      />
      <label class="mt-2" for="new-password-again">New Password Again</label>
      <input
        v-model="password.newPasswordAgain"
        type="password"
        id="new-password-again"
        name="new-password-again"
        placeholder="New Password Again"
      />
    </b-collapse>
  </b-modal>
</template>

<script>
import { mapGetters } from "vuex";
import Profile from "../../services/Profile";
import Auth from "~/services/Auth";
import jsCookie from "js-cookie";
export default {
  data() {
    return {
      modalShow: false,
      profile: {},
      passwordArea: false,
      password: {
        oldPassword: "",
        newPassword: "",
        newPasswordAgain: "",
      },
    };
  },
  mounted() {
    this.profile = { ...this.user };
  },
  methods: {
    updateProfile() {
      if (this.passwordArea) {
        Profile.updatePassword(this.profile.accessToken, {
          oldPass: this.password.oldPassword,
          newPass: this.password.newPassword,
        })
          .then((res) => {})
          .catch((err) => {
            console.log(err);
          });
      }
      Profile.updateUser(this.user.accessToken, this.profile)
        .then((res) => {
          if (res.data.success) {
            //EĞER UPDATE BAŞARILI İSE BURADA MESAJ GÖSTER.
            //FİNALLY KISMINI BURADAKİ SONUCA BAĞLA.
            //AYNI İŞİ PROFİLE.VUE İÇİNDEKİ İMAGE UPDATE İÇİN YAP.
            //test different repo
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.getUserDetails();
        });
    },
    getUserDetails() {
      Auth.getUserDetails(this.user.accessToken).then((res) => {
        if (res.data) {
          let user = {
            ...this.user,
            ...res.data,
          };
          jsCookie.set("user", JSON.stringify(user));
          this.$store.commit("user/SET_USER", user);
          window.location.reload();
        }
      });
    },
  },
};
</script>

<style scoped>
.custom-btn-height {
  height: 35px;
}
</style>
