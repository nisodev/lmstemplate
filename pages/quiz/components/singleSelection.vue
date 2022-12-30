<template>
  <div>
    <div
      v-for="answer in question.questionAnswers"
      :key="answer.id"
      class="d-flex w-100 justify-content-center align-items-center"
    >
      <label class="mb-0" :for="`radio${answer.id}`">{{answer.answer}}</label>
      <input
        class="custom-radio-input"
        type="radio"
        :id="`radio${answer.id}`"
        name="radioBtn"
        @input="setAnswer(answer)"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: Object,
      default: () => {}
    },
  },
  mounted () {
    this.setSelectedAnswer()
  },
  methods: {
    setAnswer(answer) {
      this.question.selectedAnswer = {
        userguid: this.user.guid,
        qid: this.question.id,
        answer: answer?.answer,
        answerValue: answer?.value,
      };
    },
    async setSelectedAnswer(){
      const res = await this.$store.dispatch('quiz/getQuestionDetails', this.question.id)
      console.log(res);
    }
  },
};
</script>

<style>
.custom-radio-input{
  width: 20px !important;
  height: 20px !important;
  border-radius: 50% !important;
  border: 1px solid black !important;
  margin-left: 10px !important;
}
</style>
