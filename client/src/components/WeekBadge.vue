<template>
  <div class="badge-week badge-week-input" v-if="input && week">
    <span class="badge badge-pill" v-for="(date, index) in dates" :key="date" :class="{'badge-muted':!week.includes(date), 'badge-first':(index == 0)}" @click="toggle(date)">{{ date }}</span>
  </div>
  <div class="badge-week" v-else-if="week">
    <span class="badge badge-pill" v-for="(date, index) in dates" :key="date" :class="{'badge-muted':!week.includes(date), 'badge-first':(index == 0)}">{{ date }}</span>
  </div>
</template>

<script>
export default {
  name: "week-badge",
  props: ["week", "input"],
  data: function() {
    return {
      dates: ["일", "월", "화", "수", "목", "금", "토"],
      enable: []
    };
  },
  methods: {
    toggle: function(date) {
      if (this.week.includes(date)) {
        this.week.splice(this.week.indexOf(date), 1);
      } else {
        this.week.push(date);
      }
    }
  }
};
</script>

<style scoped>
.badge {
  margin-top: -1px;
  margin-left: 3px;
  color: white;
  background-color: #00796b;
  font-size: 13px;
}
.badge.badge-muted {
  background-color: #b2dfdb;
}

.badge-first {
  margin-left: 0 !important;
}

.badge-week-input > span {
  cursor: pointer;
}
.badge-week-input > span:hover {
  box-shadow: 0 0 2px 1px #d4d4d5;
}
</style>
