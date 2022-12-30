<template>
    <div class="blog">
        <div class="thumbnail">
            <n-link :to="`/blog/blog-details/${blog.id}`" class="image">
                <img :src="blog.featuredImage || require('~/assets/img/course-placeholder.jpeg')" :alt="blog.alt">
            </n-link>
        </div>
        <div class="info">
            <n-link :to="`/blog/blog-details/${blog.id}`" class="category">{{ blog.category }}</n-link>
            <h3 class="title">
                <n-link :to="`/blog/blog-details/${blog.id}`">{{ blog.title }}</n-link>
            </h3>
            <ul class="meta">
                <li><i class="far fa-calendar"></i>{{ blog.createdAt | DateTimeParse('mm.DD.yyyy') }}</li>
                <!-- <li><i class="far fa-eye"></i>{{ blog.view }}</li> -->
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['blog']
    };
</script>

<style lang="scss" scoped>
.image{
    height: 200px;
    overflow: hidden;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
</style>