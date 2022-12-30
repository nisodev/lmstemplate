<template>
  <div class="container">
    <b-overlay :show="loading" no-wrap></b-overlay>
    <div class="nav d-flex justify-content-between">
      <h4 class="quiz-course-name">Course Name</h4>
      <countdown :time="duration * 1000">
        <template slot-scope="props"
          >Time Remaining：{{ props.hours }}:{{ props.minutes }}:{{
            props.seconds
          }}</template
        >
      </countdown>
    </div>
    <div
      v-if="question.question"
      class="d-flex flex-column justify-content-center align-items-center mt-4"
      style="min-height: 35vh"
    >
      <div>
        <h5>{{ question.question }}</h5>
      </div>
      <div class="w-100">
        <single-selection
          :question="question"
          v-if="question.questionType === 'SINGLE_SELECTION'"
        ></single-selection>
        <multi-selection
          :question="question"
          v-if="question.questionType === 'MULTIPLE_SELECTION'"
        ></multi-selection>
        <single-selection
          :question="question"
          v-if="question.questionType === 'YES_NO_QUESTION'"
        ></single-selection>
      </div>
      <div>
        <button
          @click="buttonText === 'Next' ? answer() : finishQuiz()"
          class="btn btn-primary mt-4"
        >
          {{ buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import singleSelection from './components/singleSelection.vue';
import multiSelection from './components/multiSelection.vue';

export default {
  components: { singleSelection, multiSelection },
  name: 'quiz',
  data() {
    return {
      duration: 1,
      questionIndex: 0,
      loading: false
    };
  },
  async created() {
    await this.init();
  },
  computed: {
    convertedDuration() {
      let minutes = Math.floor(this.duration / 60);
      let seconds = this.duration % 60;
      return `${minutes}:${seconds}`;
    },
    question() {
      return this.$store.getters['quiz/getQuestion'];
    },
    questions() {
      return this.$store.getters['quiz/getQuestions'];
    },
    buttonText() {
      return this.questionIndex === this.questions.length - 1
        ? 'Finish'
        : 'Next';
    },
  },
  methods: {
    async init() {
      this.loading = true
      const data = {
        courseguid: this.$route.query.courseguid,
        userguid: this.user.guid,
        exid: this.$route.query.exid,
      };
      const res = await this.$store.dispatch('quiz/startQuiz', data);
      console.log(res);
      this.duration = 120 * 60;
      localStorage.setItem('duration', 120 * 60);
      this.loading = false
    },
    async answer() {
      this.loading = true
      try {
        await this.$store.dispatch(
          'quiz/answer',
          this.question?.selectedAnswer
        );
        this.questionIndex++;
        if (this.questionIndex < this.questions.length) {
          this.$store.commit(
            'quiz/SET_QUESTION',
            this.questions[this.questionIndex]
          );
        }
        if (this.questionIndex === this.questions.length) {
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false
      }
    },
    async finishQuiz() {
      const data = {
        courseguid: this.$route.query.courseguid,
        phcode: this.questions[0].examguid,
        userguid: this.user.guid,
        exid: this.$route.query.exid,
      };
      const res = await this.$store.dispatch('quiz/finishQuiz', data);
      this.$store.commit('quiz/SET_RESULT', res.examResult);
      localStorage.removeItem('result')
      localStorage.setItem('result', JSON.stringify(res.examResult))
      this.$router.push({
        path: '/quiz/result',
        query: { id: this.questions[0].subscriptionexamid },
      });
    },
  },
};
</script>

<style scoped>
</style>
