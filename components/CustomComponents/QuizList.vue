<template>
  <div class="profile-content-quizzes">
    <div class="learn-press-subtab-content">
      <div class="row">
        <div class="col-12 scroll">
          <table class="lp-list-table table">
            <thead>
              <tr>
                <th class="column-course">Course</th>
                <th class="column-quiz">Quiz</th>
                <th class="column-status">Progress</th>
                <th class="column-time-interval">Duration</th>
                <th class="column-time-interval">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="quiz in quizList"
                :key="quiz.id"
              >
                <td class="column-course">
                  <span>{{ quiz.coursename }}</span>
                </td>
                <td class="column-quiz">
                  <span>{{ quiz.examInfo.title }}</span>
                </td>
                <td class="column-status">
                  <span
                    :class="
                      !quiz.examCompleted
                        ? 'label-not-started'
                        : 'label-passed'
                    "
                    class="lp-label"
                    >{{
                      !quiz.examCompleted
                        ? 'Not Completed'
                        : 'Completed'
                    }}</span
                  >
                </td>
                <td class="column-time-interval">
                  {{ quiz.examInfo.examDuration }} Minutes
                </td>
                <td>
                  <button
                  v-if="!quiz.examCompleted"
                    @click="startQuiz(quiz)"
                    class="btn btn-primary btn-xs"
                  >
                    Start
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    quizList() {
      return this.$store.getters['quiz/getQuizList'];
    },
  },
  async created() {
    await this.init();
  },
  methods: {
    async init() {
      await this.$store.dispatch('quiz/fetchQuizzes');
    },
    startQuiz(quiz) {
      if (quiz.examStatus === 0) {
        return;
      }
      this.$swal({
        title: 'Are you sure?',
        text: 'You want to start this quiz!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, start it!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push({
            name: 'quiz',
            query: { courseguid: quiz.courseguid, exid: quiz.id },
          });
        }
      });
    },
  },
};
</script>

<style>
</style>
