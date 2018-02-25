<template>
  <div class="badge-week badge-week-input" v-if="input">
    <span id="badge-week-0" class="badge badge-pill badge-primary" :class="{'badge-muted':!week.includes('일')}">일</span>
    <span id="badge-week-1" class="badge badge-pill badge-primary" :class="{'badge-muted':!week.includes('월')}">월</span>
    <span id="badge-week-2" class="badge badge-pill badge-primary" :class="{'badge-muted':!week.includes('화')}">화</span>
    <span id="badge-week-3" class="badge badge-pill badge-primary" :class="{'badge-muted':!week.includes('수')}">수</span>
    <span id="badge-week-4" class="badge badge-pill badge-primary" :class="{'badge-muted':!week.includes('목')}">목</span>
    <span id="badge-week-5" class="badge badge-pill badge-primary" :class="{'badge-muted':!week.includes('금')}">금</span>
    <span id="badge-week-6" class="badge badge-pill badge-primary" :class="{'badge-muted':!week.includes('토')}">토</span>
  </div>
  <div class="badge-week" v-else>
    <router-link :to="{name:'home'}"><span class="badge badge-pill badge-primary" :class="{'badge-muted':!week.includes('일')}">일</span></router-link>
    <router-link :to="{name:'home'}"><span class="badge badge-pill badge-primary" :class="{'badge-muted':!week.includes('월')}">월</span></router-link>
    <router-link :to="{name:'home'}"><span class="badge badge-pill badge-primary" :class="{'badge-muted':!week.includes('화')}">화</span></router-link>
    <router-link :to="{name:'home'}"><span class="badge badge-pill badge-primary" :class="{'badge-muted':!week.includes('수')}">수</span></router-link>
    <router-link :to="{name:'home'}"><span class="badge badge-pill badge-primary" :class="{'badge-muted':!week.includes('목')}">목</span></router-link>
    <router-link :to="{name:'home'}"><span class="badge badge-pill badge-primary" :class="{'badge-muted':!week.includes('금')}">금</span></router-link>
    <router-link :to="{name:'home'}"><span class="badge badge-pill badge-primary" :class="{'badge-muted':!week.includes('토')}">토</span></router-link>
  </div>
</template>

<script>
export default {
  name: "week-badge",
  props: ["week", "input"],
  mounted: function() {
    $(".badge-week-input > span").click(function(e) {
      $(e.target).toggleClass("badge-muted");
    });
  }
};
</script>

<style scoped>
.badge {
  margin-top: -1px;
  background-color: #479eea;
  font-size: 13px;
}

.badge:hover {
  box-shadow: 0 0 2px 1px #d4d4d5;
}

.badge.badge-muted {
  background-color: #b7defa;
}

.badge-week-input > span {
  cursor: pointer;
}
</style>
