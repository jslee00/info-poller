<template>
  <nav class="navbar navbar-expand-md fixed-top navbar-dark bg-dark justify-content-between">
    <router-link :to="{name:'home'}" class="navbar-brand" tabindex="0" onclick="$('.offcanvas-collapse').removeClass('open');">Poller</router-link>
    <button class="navbar-toggler p-0 border-0" type="button" data-toggle="offcanvas" onclick="$('.offcanvas-collapse').toggleClass('open');">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link :to="{name:'home'}" active-class="active" class="nav-link" onclick="$('.offcanvas-collapse').removeClass('open');">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name:'introduce', query:{s:'main'}}" active-class="active" class="nav-link" onclick="$('.offcanvas-collapse').removeClass('open');">소개</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name:'pollList'}" v-if="user.name != undefined" active-class="active" class="nav-link" onclick="$('.offcanvas-collapse').removeClass('open');">참여하기</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name:'open'}" v-if="user.rank == 'admin'" active-class="active" class="nav-link" onclick="$('.offcanvas-collapse').removeClass('open');">개설하기</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name:'userInfo', params:{'user_id':user._id}}" v-if="user.name != undefined" active-class="active" class="nav-link" onclick="$('.offcanvas-collapse').removeClass('open');">내 정보</router-link>
        </li>
      </ul>
      <div class="navbar-nav">
        <div class="nav-item">
          <span class="nav-link disabled" v-if="user.name != undefined">안녕하세요, {{ user.name }} 님</span>
        </div>
        <div class="nav-item">
          <router-link :to="{name:'logout'}" v-if="user.name != undefined" active-class="active" class="nav-link" onclick="$('.offcanvas-collapse').removeClass('open');">로그아웃</router-link>
          <router-link :to="{name:'login'}" v-else active-class="active" class="nav-link" onclick="$('.offcanvas-collapse').removeClass('open');">로그인</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "navbar",
  computed: mapState(["user"])
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

.navbar-brand:focus {
  outline: none;
}

.navbar-dark .navbar-nav .nav-link.disabled {
  color: white;
}
</style>

