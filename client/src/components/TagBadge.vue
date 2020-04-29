<template>
  <div class="badge-tag" v-if="tags != undefined">
    <i class="fas fa-tags"></i>
    <router-link v-for="tag in tags" :key="tag" :to="{name:'searchItem', query:{poll:poll, tag:tag}}"><span class="badge badge-pill">{{ tag }}</span></router-link>
  </div>
</template>

<script>
export default {
  name: "tag-badge",
  props: ["tags", "poll"]
};
</script>

<style scoped>
.badge {
  margin-left: 5px;
  font-size: 13px;
  color: white;
  background-color: #1976d2;
}

.badge:hover {
  box-shadow: 0 0 2px 1px #d4d4d5;
}

.fa-tags + a > .badge {
  margin-left: 0;
}
</style>
