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
          text: "소개",
          badge: 0,
          to: { name: "introduce", query: { s: "main" } },
          type: "exact"
        },
        {
          text: "사용법 - 선생님",
          badge: 0,
          to: { name: "introduce", query: { s: "teacher" } },
          type: "exact"
        },
        {
          text: "사용법 - 학생",
          badge: 0,
          to: { name: "introduce", query: { s: "student" } },
          type: "exact"
        }
      ]
    };
  }
};
</script>

<style scoped>

</style>
