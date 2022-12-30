<template>
    <div class="zoom-meeting-page-wrapper">

        <HeaderStyleTwo />

        <OffCanvasMobileMenu />

        <div class="page-title-section section-padding-top-0">
            <div class="page-breadcrumb">
                <div class="container">
                    <ul class="breadcrumb">
                        <li>
                            <n-link to="/">Home</n-link>
                        </li>
                        <li class="current">Zoom Meetings</li>
                    </ul>
                </div>
            </div>

            <div class="page-title">
                <div class="container">
                    <h1 class="title">Zoom Meetings</h1>
                </div>
            </div>
        </div>

       <!-- Event Section Start -->
        <div class="section-padding-bottom">
            <div class="container">
                <div class="row row-cols-lg-3 row-cols-md-2 row-cols-1 max-mb-n30">
                    <div class="col max-mb-30" v-for="(post, index) in zoomPosts" :key="index">
                        <ZoomMeetingPost :post="post" />
                    </div>
                </div>

                <div class="row max-mt-50">
                    <div class="col text-center">
                        <button class="btn btn-outline-primary load-more-btn" @click="loadMore" v-if="currentItem < zoomData.length">
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
    import zoomData from '~/data/zoom'
    
    export default {
        components: {
            HeaderStyleTwo: () => import('@/components/HeaderStyleTwo'),
            OffCanvasMobileMenu: () => import('@/components/OffCanvasMobileMenu'),
            ZoomMeetingPost: () => import('@/components/ZoomMeetingPost'),
            FooterStyleOne: () => import('@/components/FooterStyleOne'),
        },

        data () {
            return {
                zoomData,
                currentItem: 6
            }
        },

        computed: {
            zoomPosts() {
                return this.zoomData.slice(0, this.currentItem);
            },
        },

        methods: {
            loadMore() {
                this.currentItem += 3;
            },
        },

        head() {
            return {
                title: 'Zoom Meetings'
            }
        },
    };
</script>

