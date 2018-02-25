<template>
  <div class="app bg-light">
    <navbar></navbar>
    <router-view></router-view>
    <button class="go-to-top btn btn-info btn-circle btn-xl" onclick="document.body.scrollTop = 0; document.documentElement.scrollTop = 0;"><i class="fas fa-arrow-up"></i></button>
    <footer class="container mt-4">
      <p>© 2018 FCFS. Made by neiwiso.</p>
    </footer>
    <loading v-show="isLoading"></loading>
  </div>
</template>

<script>
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import { mapState } from "vuex";

export default {
  name: "app",
  components: { Loading, Navbar },
  computed: mapState(["isLoading"])
};
</script>

<style scoped>
@media (max-width: 768px) {
  .go-to-top {
    width: 40px !important;
    height: 40px !important;
  }
}

.app {
  min-height: 100%;
}

.form-inline > * {
  font-size: 14px;
}

.go-to-top {
  position: fixed;
  bottom: 4%;
  right: 5%;
  width: 45px;
  height: 45px;
  color: #fff;
  background: #2c98de;
  cursor: pointer;
  border: none;
  border-radius: 50%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.275);
  z-index: 1;
}
.go-to-top:hover,
.go-to-top:focus,
.go-to-top:active {
  outline: none;
}

footer p {
  text-align: center;
  color: #888888;
  font-size: 13px;
}
</style>
