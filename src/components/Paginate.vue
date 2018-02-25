<template>
  <ul :class="containerClass">
    <li :class="[pageClass, {'disabled': (currentPage == 1)}]">
      <a :class="linkClass" @click="clickHandler(currentPage - 1)" tabindex="-1">{{ prevText }}</a>
    </li>
    <li v-for="(page, index) in pages" :key="index" :class="[pageClass, {'active': (currentPage == page)}]">
      <a v-if="Number.isInteger(page)" :class="linkClass" @click="clickHandler(page)" tabindex="0">{{ page }}</a>
      <a v-else :class="linkClass" tabindex="0">{{ page }}</a>
    </li>
    <li :class="[pageClass, {'disabled': (currentPage == pageCount)}]">
      <a :class="linkClass" @click="clickHandler(currentPage + 1)" tabindex="-1">{{ nextText }}</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "paginate",
  props: [
    "currentPage",
    "pageCount",
    "pageRange",
    "marginPages",
    "clickHandler",
    "prevText",
    "nextText",
    "containerClass",
    "pageClass",
    "linkClass"
  ],
  computed: {
    pages: function() {
      var pages = [];

      var currentPage = parseInt(this.currentPage);
      var pageCount = this.pageCount;
      var pageRange = this.pageRange;
      var marginPages = this.marginPages;
      var threedot = false;

      for (var i = 1; i <= pageCount; i++) {
        if (
          i == currentPage ||
          (i >= currentPage - pageRange && i <= currentPage + pageRange) ||
          i <= marginPages ||
          i >= pageCount - marginPages + 1
        ) {
          pages.push(i);
          threedot = false;
        } else {
          if (!threedot) {
            pages.push("...");
            threedot = true;
          }
        }
      }

      return pages;
    }
  }
};
</script>

<style>

</style>
