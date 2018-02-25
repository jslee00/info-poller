<template>
  <nav class="navbar navbar-expand-md fixed-top navbar-dark bg-dark justify-content-between">
    <router-link :to="{name:'home'}" class="navbar-brand" tabindex="0">FCFS</router-link>
    <button class="navbar-toggler p-0 border-0" type="button" data-toggle="offcanvas" onclick="$('.offcanvas-collapse').toggleClass('open');">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link :to="{name:'home'}" active-class="active" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name:'introduce'}" active-class="active" class="nav-link">소개</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name:'itemList'}" v-if="username != undefined" active-class="active" class="nav-link">신청하기</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name:'open'}" v-if="username != undefined" active-class="active" class="nav-link">개설하기</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name:'userInfo', params:{'username':username}}" v-if="username != undefined" active-class="active" class="nav-link">내 정보</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name:'logout'}" v-if="username != undefined" active-class="active" class="nav-link">로그아웃</router-link>
          <router-link :to="{name:'login'}" v-else active-class="active" class="nav-link">로그인</router-link>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="text" placeholder="무엇을 찾을까요?" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">검색</button>
      </form>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "navbar",
  computed: mapState(["username"])
};
</script>

<style scoped>
@media (max-width: 767.98px) {
  .offcanvas-collapse {
    position: fixed;
    top: 56px;
    bottom: 0;
    width: 100%;
    padding-right: 1rem;
    padding-left: 1rem;
    overflow-y: auto;
    background-color: var(--gray-dark);
    transition: -webkit-transform 0.3s ease-in-out;
    transition: transform 0.3s ease-in-out;
    transition: transform 0.3s ease-in-out, -webkit-transform 0.3s ease-in-out;
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
  .offcanvas-collapse.open {
    -webkit-transform: translateX(-1rem);
    transform: translateX(-1rem);
  }
}
</style>

