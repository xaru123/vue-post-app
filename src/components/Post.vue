<template>
  <div class="card h-100" :class="{'border-info': isSelected}">
    <div class="card-body">
      <template v-if="!isEdit && !isNew">
        <p class="card-text" :title="info.name">{{ info.name }}</p>
      </template>
      <form v-else class="was-validated h-100">
      <textarea
          required
          class="form-control h-100"
          id="editName"
          v-model="editPostName"></textarea>
      </form>
    </div>
    <div class="card-footer btn-toolbar justify-content-end">
      <div class="btn-group text-right" role="group">
        <template v-if="!isEdit && !isNew">
          <button
              type="button"
              class="btn btn-warning"
              @click="onClickEditPost">
            <i class="bi bi-pencil"></i>
          </button>
          <button
              type="button"
              class="btn btn-danger"
              @click="onClickDeletePost(info.id)">
            <i class="bi bi-x-circle"></i>
          </button>
        </template>
        <button v-else-if="!isNew"
                type="button"
                :disabled="!editPostName"
                class="btn btn-success"
                @click="setEditData">
          <i class="bi bi-check2-circle"></i>
        </button>
        <button
            v-else type="button"
            class="btn btn-success"
            :disabled="!editPostName"
            @click="onClickAddPost">
          <i class="bi bi-check2-circle"> Новый пост</i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Post',
  props: {
    isSelected: {
      type: Boolean,
      default: false,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    info: {
      type: Object,
      default: () => {
        return {
          name: '', id: new Date().getTime(),
        };
      },
    },
  },
  data: () => ({
    isEdit: false,
    editPostName: null,
  }),
  mounted() {
    this.editPostName = this.info.name;
  },
  methods: {
    onClickAddPost() {
      if (!this.editPostName) {
        return;
      }
      this.$store.dispatch('addPost', {...this.info, name: this.editPostName});
      this.editPostName = null;
    },
    onClickEditPost() {
      this.isEdit = true;
    },
    setEditData() {
      this.isEdit = false;
      this.$store.dispatch('editPost', {...this.info, name: this.editPostName});
    },
    onClickDeletePost(id) {
      this.$store.dispatch('deletePost', id);
    },
  },
};
</script>

<style scoped>
.card {
  min-height: 200px;
}
p.card-text {
  margin: 0;
  -webkit-line-clamp: 4;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card:hover {
  box-shadow: 0px 1px 4px 0 #1bcaed;
}

textarea#editName {
  resize: none;
}
</style>