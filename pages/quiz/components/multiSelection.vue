<template>
  <div>
    <div
      v-for="answer in question.questionAnswers"
      :key="answer.id"
      class="d-flex w-100 justify-content-center align-items-center"
    >
      <label class="mb-0" :for="`checkbox${answer.id}`">Şık 1</label>
      <input
        v-model="data"
        class="custom-radio-input"
        type="checkbox"
        :value="answer"
        :id="`checkbox${answer.id}`"
        name="checbokBtn"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      data: [],
    };
  },
  watch: {
    data(val) {
      this.question.selectedAnswer = {
        userguid: this.user.guid,
        qid: this.question.id,
        answers: val,
      };
    },
  },
};
</script>

<style></style>
