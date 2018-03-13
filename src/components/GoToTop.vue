<template>
  <button class="go-to-top btn btn-info btn-circle btn-xl" @click="goToTop"><i class="fas fa-arrow-up"></i></button>
</template>

<script>
export default {
  name: "go-to-top",
  methods: {
    goToTop: function() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }
};
</script>

<style scoped>
@media (max-width: 768px) {
  .go-to-top {
    width: 40px !important;
    height: 40px !important;
  }
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
</style>
