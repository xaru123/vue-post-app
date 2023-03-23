<template>
  <div class="container text-center">
    <div class="row">
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col">
          <Post :isNew="true"/>
        </div>
        <div class="col" v-for="post in displayedPosts" :key="post.id" @click="onPostClick(post.id)">
          <Post :info="post" :isSelected="post.id == selectedPostId"/>
        </div>
      </div>
    </div>

    <nav class="mt-5 text-center">
      <ul class="pagination">
        <li class="page-item"><a class="page-link" href="#" v-if="page != 1" @click="page--"> Назад </a></li>
        <li class="page-item" v-for="pageNumber in pages.slice(page-1, page+5)" :key="pageNumber">
          <a class="page-link" href="#" @click="page = pageNumber">{{ pageNumber }}</a></li>
        <li class="page-item"><a class="page-link" href="#" @click="page++" v-if="page < pages.length"> Вперед</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
import Post from './Post';

export default {
  name: 'ListPosts',
  components: {Post},
  computed: {
    posts() {
      return this.$store.getters.posts;
    },
    displayedPosts() {
      return this.paginate(this.posts);
    },
  },
  data: () => ({
    selectedPostId: null,
    page: 1,
    perPage: 100,
    pages: [],
  }),
  mounted() {
    this.setPages();
  },
  methods: {
    onPostClick(id) {
      this.selectedPostId = id;
    },
    paginate(posts) {
      let from = (this.page * this.perPage) - this.perPage;
      let to = (this.page * this.perPage);
      return posts.slice(from, to);
    },
    setPages() {
      let numberOfPages = Math.ceil(this.posts.length / this.perPage);
      for (let i = 1; i <= numberOfPages; i++) {
        this.pages.push(i);
      }
    },
  },
};
</script>