<template>
  <div class="row">
    <div class="col-sm-6 col-md-4 col-lg-3 mt-4" v-for="item in itemList" :key="item._id" v-if="option.param == '' || option.value == '' || (option.param == 'title' && item.title.includes(option.value)) || (option.param == 'intro' && item.intro.includes(option.value)) || (option.param == 'tag' && item.tags.includes(option.value)) || (option.param == 'leader' && item.leaderincludes(option.value)) || (option.param == 'all' && (item.title.includes(option.value) || item.intro.includes(option.value) || item.tags.includes(option.value) || item.leader.includes(option.value)))">
      <router-link class="item" :to="{name:'itemDetail', params:{poll_id:item.poll, item_id:item._id}}">
        <div id="item-1" class="card">
          <div class="card-img-wrapper">
            <img class="card-img" :src="item.image">
          </div>
          <div class="card-block">
            <h4 class="card-title">{{ item.title }}</h4><span class="ml-2" v-if="item.applied"><i class="fas fa-check-circle"></i></span>
            <div class="meta">
              <span>{{ item.leader }}</span>
            </div>
            <div class="card-badge">
              <week-badge :week="item.week"></week-badge>
            </div>
            <div class="card-text">
              {{ item.intro }}
            </div>
          </div>
          <div class="card-footer">
            <span class="imminent"><i class="fas fa-users"></i> {{ item.currentApply }} / {{ (item.maxApply == -1)?("&#x221E;"):(item.maxApply) }}</span>
            <div class="mt-2">
              <!-- <tag-badge :tags="item.tags" :poll="poll" class="d-inline-block"></tag-badge> -->
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div><!-- .row -->
</template>

<script>
import { mapState } from "vuex";

import CONSTANT from "../constant";

import TagBadge from "./TagBadge";
import WeekBadge from "./WeekBadge";

export default {
  name: "item-list",
  props: ["poll", "option"],
  components: { TagBadge, WeekBadge },
  mounted: function() {
    this.$store.dispatch(CONSTANT.LOAD_ITEM_LIST, {
      poll_id: this.poll
    });
  },
  computed: mapState(["itemList"])
};
</script>

<style scoped>
.row > div > a {
  text-decoration: none;
}

.card {
  font-size: 15px;
  overflow: hidden;
  padding: 0;
  border: none;
  border-radius: 0.28571429rem;
  box-shadow: 1px 1px 3px 1px #d4d4d5;
}

.card:hover {
  box-shadow: 1px 1px 5px 3px #d4d4d5;
}

.card-block {
  font-size: 15px;
  position: relative;
  margin: 0;
  padding: 15px 15px 10px 15px;
  border: none;
  border-top: 1px solid rgba(34, 36, 38, 0.1);
  box-shadow: none;
}

.card-img-wrapper {
  max-height: 200px;
  overflow: hidden;
}
.card-img {
  display: block;
  width: 100%;
}

.card-title {
  display: inline-block;
  text-decoration: none;
  color: rgba(0, 0, 0, 1);
  font-size: 18px;
  font-weight: 700;
}

.card-text {
  display: -webkit-box;
  height: 105px;
  margin-top: 8px;
  font-size: 15px;
  line-height: 1.4;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  color: rgba(0, 0, 0, 0.68);
}

.card-badge {
  margin-top: 8px;
}

.card-footer {
  font-size: 13px;
  position: static;
  top: 0;
  left: 0;
  max-width: 100%;
  padding: 12px 15px;
  color: rgba(0, 0, 0, 0.4);
  border-top: 1px solid rgba(0, 0, 0, 0.05) !important;
  background: #fff;
}

.imminent {
  color: #ff6666;
}

.meta {
  font-size: 15px;
  color: rgba(0, 0, 0, 0.4);
}

.meta a,
.meta span {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.4);
}

.meta a:hover {
  color: rgba(0, 0, 0, 0.87);
}
</style>
