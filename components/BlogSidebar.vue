<template>
    <div class="sidebar-widget-wrapper">
        <div class="sidebar-widget">
            <h3 class="sidebar-widget-title mb-2">Popular posts</h3>
            <div class="sidebar-widget-content">
                <ul class="sidebar-widget-list-post">
                    <li v-for="post in posts.slice(0, 5)" :key="post.id">
                        <n-link to="/blog/blog-details">{{ post.title }}</n-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['posts']
    };
</script>