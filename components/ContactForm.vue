<template>
  <div class="contact-form pl-90 pl-md-0 pl-sm-0 pl-xs-0">
    <div class="row max-mb-n30">
      <div class="col-md-6 max-mb-30">
        <input
          v-model="data.senderName"
          type="text"
          placeholder="Your Name *"
          name="name"
        />
      </div>
      <div class="col-md-6 max-mb-30">
        <input
          v-model="data.messageEmail"
          type="email"
          placeholder="Email *"
          name="email"
        />
      </div>
      <div class="col-md-12 max-mb-30">
        <input
          v-model="data.messageTitle"
          type="text"
          placeholder="Subject *"
          name="subject"
        />
      </div>
      <div class="col-12 max-mb-30">
        <textarea
          name="message"
          v-model="data.messageBody"
          placeholder="Message"
        ></textarea>
      </div>
      <div class="col-12 max-mb-30">
        <button
          @click="sendFeedback"
          class="btn btn-primary btn-hover-secondary btn-width-180 btn-height-60"
        >
          Submit
        </button>
      </div>
    </div>
    <p class="form-messege"></p>
  </div>
</template>

<script>
import Mail from "../services/Mail";
export default {
  data() {
    return {
      data: {},
    };
  },
  mounted() {},
  methods: {
    sendFeedback() {
      Mail.feedback(this.data)
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
