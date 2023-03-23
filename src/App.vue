<template>
  <div id="app">
    <Navbar/>
    <div class="container py-3 mx-auto text-center">
      <FormSearch/>
      <ListPosts/>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import ListPosts from './components/ListPosts';
import FormSearch from './components/FormSearch';

export default {
  name: 'App',
  components: {FormSearch, Navbar, ListPosts},
};
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.css';
@import '~bootstrap-icons/font/bootstrap-icons.css';
</style>
