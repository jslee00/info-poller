<template>
  <div class="app bg-light">
    <navbar></navbar>
    <router-view></router-view>
    <go-to-top></go-to-top>
    <footer class="container mt-4">
      <p>© 2018 Poller. Made by neiwiso.</p>
    </footer>
    <loading v-show="isLoading"></loading>
  </div>
</template>

<script>
import { mapState } from "vuex";

import CONSTANT from "./constant";

import Loading from "./components/Loading";
import GoToTop from "./components/GoToTop";
import Navbar from "./components/Navbar";

export default {
  name: "app",
  components: { Loading, Navbar, GoToTop },
  computed: mapState(["isLoading"]),
  mounted: function() {
    this.$store.dispatch(CONSTANT.LOAD_AUTH);
  }
};
</script>

<style scoped>
.app {
  min-height: 100%;
}

footer p {
  text-align: center;
  color: #888888;
  font-size: 13px;
}
</style>
