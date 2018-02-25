<template>
  <div>
    <nav-scroller :submenu="submenu"></nav-scroller>
    <div class="container-fluid">
      
    </div><!-- .container-fluid -->
  </div>
</template>

<script>
import NavScroller from "./NavScroller";

export default {
  name: "introduce",
  props: ["s"],
  components: { NavScroller },
  data: function() {
    return {
      submenu: [
        {
          text: "Login",
          badge: 0,
          to: { name: "login" }
        }
      ]
    };
  }
};
</script>

<style scoped>

</style>
