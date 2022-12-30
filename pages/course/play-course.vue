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
            <li class="current">{{ course.courseinfo.name }}</li>
          </ul>
        </div>
      </div>

      <div class="page-title">
        <div class="container">
          <h1 class="title">{{ course.courseinfo.name }}</h1>
        </div>
      </div>
    </div>

    <div style="max-width: 80% !important" class="container">
      <div class="row">
        <div class="col-lg-3 col-12 max-mb-50">
          <div class="sidebar-widget-wrapper pr-0">
            <div class="sidebar-widget">
              <div class="sidebar-widget-content">
                <div class="sidebar-entry-course-info" v-if="course">
                  <course-lecture-row
                    v-for="lecture in course.Lectures"
                    :key="lecture.id"
                    :lecture="lecture"
                  ></course-lecture-row>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-9 col-12">
          <div class="row row-cols-1 no-gutters">
            <div v-if="lesson" class="col lesson-col">
              <pdf-lesson
                :asset="lesson.LessonInfo.assetUrl"
                v-if="lesson.LessonInfo.lessonType === 'PDF_CONTENT'"
              ></pdf-lesson>
              <video-lesson
                @timeupdate="timeupdate"
                :asset="lesson.LessonInfo.videoUrl"
                v-if="lesson.LessonInfo.lessonType === 'VIDEO_LESSON'"
              ></video-lesson>
              <image-lesson
                :asset="lesson.LessonInfo.assetUrl"
                v-if="lesson.LessonInfo.lessonType === 'IMAGE_CONTENT'"
              ></image-lesson>
              <text-lesson
                :asset="lesson.LessonInfo.lessonContent"
                v-if="lesson.LessonInfo.lessonType === 'TEXT_CONTENT'"
              ></text-lesson>
            </div>
          </div>
        </div>
      </div>
    </div>

    <FooterStyleOne />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CourseLectureRow from '../../components/CustomComponents/CourseLectureRow.vue';
import PdfLesson from '../../components/CustomComponents/LessonTypes/PdfLesson.vue';
import ImageLesson from '../../components/CustomComponents/LessonTypes/ImageLesson.vue';
import VideoLesson from '../../components/CustomComponents/LessonTypes/VideoLesson.vue';
import TextLesson from '../../components/CustomComponents/LessonTypes/TextLesson.vue';
import PlayCourse from '../../services/PlayCourse';
export default {
  name: 'PlayCourse',
  head() {
    return {
      title: this.course.coursename,
    };
  },
  components: {
    CourseLectureRow,
    PdfLesson,
    VideoLesson,
    ImageLesson,
    TextLesson,
  },
  async asyncData({ store, $cookies, route }) {
    await PlayCourse.fetchCourseProgress(
      $cookies.get('user').accessToken,
      route.query.subid
    ).then((res) => {
      if (
        res.data.data.Lectures.length > 0 &&
        res.data.data.Lectures[0].Lessons.length > 0
      ) {
        store.commit(
          'course/SET_ACTIVE_LESSON',
          res.data.data.Lectures[0].Lessons[0]
        );
      }
      //Data ilk geldiğinde ekran boş kalmasın diye yukarda ilk dersi set ettim. Daha sonra dersin statusu 100 değilse op:START olarak güncelliyorum.
      if (
        res.data.data.Lectures[0].Lessons[0].LessonInfo.lessonType !==
          'VIDEO_LESSON' &&
        res.data.data.Lectures[0].Lessons[0].progress !== 100
      ) {
        PlayCourse.updateLesson(
          $cookies.get('user').accessToken,
          res.data.data.Lectures[0].Lessons[0].id,
          {
            op: 'START',
          }
        ).catch((err) => {
          console.log(err);
        });
      }

      store.commit('course/SET_COURSE_PROGRESS', res.data.data);
    });
  },
  data() {
    return {
      videoData: {
        videoDuration: 0,
        currentSecond: 0,
      },
      needComplete: false,
    };
  },

  computed: {
    ...mapGetters({
      course: 'course/getCourseProgress',
      lesson: 'course/getActiveLesson',
    }),
  },
  watch: {
    'videoData.currentSecond'(val) {
      if (
        this.videoData.currentSecond > this.videoData.videoDuration - 20 &&
        this.videoData.videoDuration !== 0 &&
        this.needComplete
      ) {
        const requestModel = {
          data: {
            op: '',
          },
          id: 0,
        };
        requestModel.id = this.lesson.id;
        requestModel.data.op = 'COMPLETE';
        this.$store
          .dispatch('course/updateLessonProgress', requestModel)
          .then((res) => {
              this.updateProgress(this.lesson.id);
              this.needComplete = false
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    lesson(newValue, oldValue) {
      this.checkLessonIsVideo()
      //Ders ilk açıldığında progress 0 ise yeni başladığını belirtiyorum
      const requestModel = {
        data: {
          op: '',
        },
        id: 0,
      };
      if (newValue.progress === 0) {
        requestModel.id = newValue.id;
        requestModel.data.op = 'START';
        this.$store.dispatch('course/updateLessonProgress', requestModel);
      }
      //Eğer başka bir derse geçiş yaptıysa önce video lesson olup olmadığına bakıyorum
      //video ise %90'ı tamamlanmadan complete olmayacağı için if ile video dışındakileri complete yapıyorum.
      if (oldValue.id) {
        if (
          oldValue.LessonInfo.lessonType !== 'VIDEO_LESSON' &&
          oldValue.progress !== 100
        ) {
          requestModel.id = oldValue.id;
          requestModel.data.op = 'COMPLETE';
          this.$store
            .dispatch('course/updateLessonProgress', requestModel)
            .then((res) => {
              if (res.success === 100) {
                this.updateProgress(oldValue.id);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
        if (
          oldValue.LessonInfo.lessonType === 'VIDEO_LESSON' &&
          oldValue.progress !== 100
        ) {
          if (
            this.videoData.currentSecond > this.videoData.videoDuration - 20 &&
            this.videoData.videoDuration !== 0
          ) {
            requestModel.id = oldValue.id;
            requestModel.data.op = 'COMPLETE';
            this.$store
              .dispatch('course/updateLessonProgress', requestModel)
              .then((res) => {
                if (res.success === 100) {
                  this.updateProgress(oldValue.id);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      }
    },
  },
  methods: {
    updateProgress(id) {
      this.$store.commit('course/UPDATE_PROGRESS', id);
    },
    timeupdate(e) {
      if (this.videoData.videoDuration === 0) {
        this.videoData.videoDuration = Math.ceil(e.duration);
      }
      this.videoData.currentSecond = Math.ceil(e.seconds);
    },
    checkLessonIsVideo(){
      if (this.lesson.LessonInfo.lessonType === 'VIDEO_LESSON') {
        this.needComplete = true;
      } else {
        this.needComplete = false;
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.checkLessonIsVideo()
    }, 3000);
  },
};
</script>

<style scoped>
.lesson-col {
  min-height: 100vh;
}
</style>
