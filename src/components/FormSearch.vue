<template>
  <div class="container text-center mt-5">
    <div class="input-group flex-nowrap">
      <span
          class="input-group-text"
          id="addon-wrapping">
         <i class="bi bi-search"></i>
      </span>
      <input type="text"
             class="form-control"
             placeholder="Typing..."
             aria-label="Search by name"
             v-model="name"
             aria-describedby="addon-wrapping">
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormSearch',
  data: () => ({
    name: null,
  }),
  watch: {
    name(newVal) {
      this.$store.dispatch('setFilter', newVal);
    },
  },
};
</script>