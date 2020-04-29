<template>
  <div class="input-group">
    <div class="input-group-prepend">
      <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown">
        <span id="search-concept" v-for="(param, index) in params" :key="index" v-if="param.default">{{ param.text }}</span>
      </button>
      <div class="dropdown-menu">
        <a class="dropdown-item" v-for="(param, index) in params" :key="index" :href="param.href">{{ param.text }}</a>
      </div>
    </div>
    <input id="search-param" type="hidden" v-for="(param, index) in params" :key="index" v-if="param.default" :value="param.href.replace('#','')">
    <input type="text" class="form-control" v-model="value" @keyup.enter="search" placeholder="무엇을 검색할까요?">
    <span class="input-group-append">
      <button class="btn btn-outline-success" type="button" @click="search"><i class="fas fa-search"></i></button>
    </span>
  </div>
</template>

<script>
export default {
  name: "search-bar",
  props: ["params"],
  data: function() {
    return {
      value: ""
    };
  },
  methods: {
    search: function() {
      var param = $("#search-param").val();
      var value = this.value;

      this.$emit("search", param, value);
    }
  },
  mounted: function() {
    $(".dropdown-menu")
      .find("a")
      .click(function(e) {
        e.preventDefault();
        var param = $(this)
          .attr("href")
          .replace("#", "");
        var concept = $(this).text();
        $("span#search-concept").text(concept);
        $("#search-param").val(param);
      });
  }
};
</script>

<style scoped>

</style>

