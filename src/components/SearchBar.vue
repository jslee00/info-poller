<template>
  <div class="row justify-content-center">    
    <div class="col-sm-10 col-md-8 col-lg-6">
      <div class="input-group">
        <div class="input-group-prepend">
          <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown">
            <span id="search-concept">전체</span>
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#title">제목</a>
            <a class="dropdown-item" href="#intro">소개</a>
            <a class="dropdown-item" href="#detail">설명</a>
            <a class="dropdown-item" href="#leader">진행자</a>
            <a class="dropdown-item" href="#writer">작성자</a>
            <a class="dropdown-item" href="#all">전체</a>
          </div>
        </div>
        <input id="search-param" type="hidden" name="search-param" value="all">
        <input type="text" class="form-control" name="x" placeholder="무엇을 검색할까요?">
        <span class="input-group-append">
          <button class="btn btn-outline-success" type="button"><i class="fas fa-search"></i></button>
        </span>
      </div>
    </div>
  </div><!-- .row -->
</template>

<script>
export default {
  name: "search-bar",
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
        $(".input-group #search-param").val(param);
      });
  }
};
</script>

<style scoped>

</style>

