<template>
  <div>
    <nav-scroller :submenu="submenu"></nav-scroller>
    <div class="container-fluid text-center mt-5">
      <div class="error-code m-b-10 m-t-20">404 <i class="fas fa-exclamation-triangle"></i></div>
      <h3 class="font-bold mb-4">요청한 페이지를 찾을 수 없습니다.</h3>
      <div class="error-desc">
        존재하지 않는 주소이거나 변경, 삭제되어 찾을 수 없는 주소입니다. <br/>
        예상치 못한 이유로 본 페이지를 발견하신 분은 관리자에게 문의해 주시기 바랍니다.
        <div class="mt-2">
          <router-link :to="{name:'home'}" tabindex="0"><i class="fas fa-arrow-left"></i> 홈으로 돌아가기</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavScroller from "./NavScroller";

export default {
  name: "not-found",
  components: { NavScroller },
  data: function() {
    return {
      submenu: []
    };
  }
};
</script>


<style scoped>
.error-code {
  color: #2d353c;
  font-size: 96px;
}

.error-desc {
  font-size: 14px;
  color: #647788;
}
</style>
