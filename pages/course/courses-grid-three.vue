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
                        <li class="current">Courses Grid 03</li>
                    </ul>
                </div>
            </div>

            <div class="page-title">
                <div class="container">
                    <h1 class="title">Courses Grid 03</h1>
                </div>
            </div>
        </div>

        <div class="section-padding-bottom">
            <div class="container">
                <!-- Course Top Bar Start -->
                <div class="row justify-content-between align-items-center max-mb-20">
                    <div class="col-md-auto col-12 max-mb-10">
                        <p class="result-count">We found {{ courseData.coursePostItem.length }} courses available for you</p>
                    </div>
                    <div class="col-md-auto col-12 max-mb-10">
                        <v-select :options="options" :placeholder="getSelectorPlaceholder"></v-select>
                    </div>
                </div>
                <!-- Course Top Bar End -->

                <!-- Courses Wrapper Start -->
                <div class="row row-cols-lg-2 row-cols-1 max-mb-n30">
                    <div class="col max-mb-30" v-for="course in courses" :key="course.id">
                        <CourseItemStyleThree :course="course" />
                    </div>
                </div>
                <!-- Courses Wrapper End -->

                <div class="row max-mt-50">
                    <div class="col text-center">
                        <button class="btn btn-outline-primary load-more-btn" @click="loadMore" v-if="currentItem < courseData.coursePostItem.length">
                            Load More 
                            <i class="fal fa-redo ml-3"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <FooterStyleOne />

    </div>
</template>

<script>
    import courseData from '~/data/courses'
    
    export default {
        components: {
            HeaderStyleTwo: () => import('@/components/HeaderStyleTwo'),
            OffCanvasMobileMenu: () => import('@/components/OffCanvasMobileMenu'),
            FooterStyleOne: () => import('@/components/FooterStyleOne'),
        },

        data () {
            return {
                courseData,
                options: [
                    'Popularity', 
                    'Latest',
                    'Price: low to high',
                    'Price: high to low'
                ],
                placeholderItem: 'Default',
                currentItem: 8
            }
        },

        computed: {
            getSelectorPlaceholder() {
                return this.placeholderItem
            },
            courses() {
                return this.courseData.coursePostItem.slice(0, this.currentItem);
            },
        },

        methods: {
            loadMore() {
                this.currentItem += 2;
            },
        },

        head() {
            return {
                title: 'Course Grid Three'
            }
        },
    };
</script>


