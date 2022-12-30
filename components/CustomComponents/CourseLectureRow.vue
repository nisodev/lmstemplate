<template>
  <div v-if="lecture.Lessons.length > 0">
    <div
      @click="visible = !visible"
      style="cursor: pointer"
      class="course-price justify-content-between mt-2"
    >
      <h4 class="mb-0">
        {{ lecture.LectureInfo.title }}
      </h4>
      <h4 class="m-0">
        <i :class="`fas fa-angle-${visible ? 'down' : 'right'}`"></i>
      </h4>
    </div>
    <b-collapse id="collapse-4" v-model="visible" class="mt-2">
      <p
        v-for="lesson in lecture.Lessons"
        :key="lesson.id"
        :class="activeLesson.id === lesson.id ? 'active' : ''"
        class="lesson"
        @click="$store.commit('course/SET_ACTIVE_LESSON', lesson)"
      >
        <span>
          <i
            v-if="activeLesson.id === lesson.id"
            :class="`fas fa-angle-right`"
          ></i>
          {{ lesson.LessonInfo.title }}
        </span>
        <span v-if="lesson.progress === 100">
          <i style="color: green" class="fas fa-check-circle"></i>
        </span>
      </p>
    </b-collapse>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: {
    lecture: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      visible: true,
    };
  },
  computed: {
    ...mapGetters({
      activeLesson: 'course/getActiveLesson',
    }),
  },
};
</script>

<style scoped>
.lesson {
  font-size: 1.1rem !important;
  margin-bottom: 5px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}
.active {
  font-size: 1.2rem !important;
  font-weight: bold;
}
</style>