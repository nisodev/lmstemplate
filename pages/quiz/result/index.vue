<template>
  <div v-if="result" class="d-flex flex-column justify-content-center align-content-center" style="height:100vh">
    <h3 class="d-flex justify-content-center">{{result.result}}</h3>
    <div class="d-flex flex-column align-items-center justify-content-center result-box">
      <div>
        Total Count: {{result.questionCount}}
      </div>
      <div>
        Correct Count: {{result.correctCount}}
      </div>
      <div>
        Wrong Count: {{result.wrongCount}}
      </div>
      <div>
        Null Count: {{result.nullCount}}
      </div>
      <div>
        Your Score: {{result.score.toFixed(0)}}
      </div>
      <div>
        Pass Score: {{result.passScore}} 
      </div>
    </div>

    <div class="text-center">
      <button @click="$router.push('/course/profile?tab=quiz')" class="btn btn-primary mt-4">Return Quiz List</button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    result() {
      return this.$store.getters['quiz/getResult']
    }
  },
  methods: {
    async init() {
      await this.$store.dispatch('quiz/getResults', {id: this.$route.query.id})
    }
  },
  mounted () {
    this.init()
    if(!this.result){
      this.$store.commit('quiz/SET_RESULT', JSON.parse(localStorage.getItem('result')))
    }
  },
}
</script>

<style lang="scss">
.result-box{
  div{
    font-size: 1.5rem;
  }
}
</style>