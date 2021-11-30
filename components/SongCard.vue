<template>
  <div class="card">
    <div class="card-body">
      <h5 class="title">{{ title }}</h5>
      <small class="author">{{ author }}</small>

      <p class="card-text mt-3" v-html="content"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SongCard",
  props: {
    title: String,
    author: String,
    content: String,
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
.card {
  width: 100%;
}

.title {
margin: 0;
}

.author {
  color: #646464 !important;
}
</style>
