import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import json from './test(2).json';

export default new Vuex.Store({
  state: {
    posts: [...json.posts || {}],
    filter: null,
  },
  mutations: {
    editPostsName(state, {id, name}) {
      const idp = state.posts.findIndex(t => t.id === id);
      const post = state.posts[idp];

      state.posts[idp] = {...post, name};
    },
    setFilter(state, filter) {
      state.filter = filter;
    },
    addPost(state, post) {
      const posts = state.posts.concat();
      posts.unshift(post);
      state.posts = posts;
    },
    editPost(state, postEdit) {
      const posts = state.posts.concat();
      const idp = posts.findIndex(t => t.id === postEdit.id);
      const post = state.posts[idp];

      posts[idp] = {...post, ...postEdit};
      state.posts = posts;
    },
    deletePost(state, id) {
      const posts = state.posts.concat();
      const idp = posts.findIndex(t => t.id === id);

      posts.splice(idp, 1);
      state.posts = posts;
    },
  },
  actions: {
    editPostsName({commit}, posts) {
      commit('editPostsName', posts);
    },
    setFilter({commit}, filter) {
      commit('setFilter', filter);
    },
    addPost({commit}, post) {
      commit('addPost', post);
    },
    editPost({commit}, post) {
      commit('editPost', post);
    },
    deletePost({commit}, id) {
      commit('deletePost', id);
    },
  },
  getters: {
    posts: s => {
      return s.posts.filter((p, i) => {
        if (!s.filter) {
          return true;
        }
        return s.posts[i].name.includes(s.filter);
      });
    },
  },
});