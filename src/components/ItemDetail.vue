<template>
  <div>
    <nav-scroller :submenu="submenu"></nav-scroller>
    <div class="container-fluid">
      <div class="row">
        <!-- Card Projects -->
        <div class="col-12">
          <div class="card">
            <div class="card-image">
              <span id="title" class="anchor"></span>
              <!-- <img class="img-fluid" :src="item.image"> -->
              <img class="img-fluid" src="https://cdn.pixabay.com/photo/2017/10/10/22/24/wide-format-2839089_1280.jpg">
              <span class="card-title">{{ item.title }}<span class="ml-2" v-if="item.applied"><i class="fas fa-check-circle"></i></span></span>
            </div>
            <div class="card-content">
              <div class="progress" v-if="item.maxApply != -1">
                <div class="progress-bar progress-bar-striped" :class="{'bg-primary':((item.currentApply / item.maxApply >= 0) && (item.currentApply / item.maxApply < 0.33)),'bg-success':((item.currentApply / item.maxApply >= 0.33) && (item.currentApply / item.maxApply < 0.66)),'bg-warning':((item.currentApply / item.maxApply >= 0.66) && (item.currentApply / item.maxApply < 1)),'bg-danger':(item.currentApply / item.maxApply == 1)}" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" :style="'width:' + (item.currentApply / item.maxApply * 100) + '%'"></div>
                <span class="progress-type">{{ (item.currentApply / item.maxApply * 100).toFixed(2) }}% 신청 완료!</span>
                <span class="progress-completed"><i class="fas fa-users"></i> {{ item.currentApply }} / {{ item.maxApply }}</span>
              </div>
              <div class="progress" v-else>
                <div class="progress-bar progress-bar-striped disabled" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                <span class="progress-type">무제한!</span>
                <span class="progress-completed text-white"><i class="fas fa-users"></i> {{ item.currentApply }} / &#x221E;</span>
              </div>
            </div>
            <div id="leader" class="card-content">
              <div class="float-right">
                <week-badge :week="item.week" class="float-right"></week-badge>
                <div class="clearfix"></div>
                <!-- <tag-badge :tags="item.tags" :poll="poll_id" class="float-right"></tag-badge> -->
              </div>
              <div class="meta writer">
                개설한 사람: <router-link :to="{name:'userProfile', params:{user_id:item.writer._id}}">{{ item.writer.name }}</router-link>
              </div>
              <div class="meta leader" v-if="item.leader">
                진행하는 사람: <span>{{ item.leader }}</span>
              </div>
            </div>
            <div class="card-action">
              <span id="intro" class="anchor"></span>
              <p>{{ item.intro }}</p>
            </div>
            <div class="card-action">
              <a v-if="item.applied" @click="cancel">취소하기</a>
              <a v-else @click="apply">신청하기</a>
            </div>
            <div id="card-alert" class="card-content"></div>
            <div class="card-action">
              <span id="detail" class="anchor"></span>
              <pre class="detail" v-html="item.description"></pre>
            </div>
          </div>
        </div>
      </div>
    </div><!-- .container -->
  </div>
</template>

<script>
import { mapState } from "vuex";

import CONSTANT from "../constant";

import NavScroller from "./NavScroller";
import TagBadge from "./TagBadge";
import WeekBadge from "./WeekBadge";

export default {
  name: "item-detail",
  props: ["poll_id", "item_id"],
  components: { NavScroller, TagBadge, WeekBadge },
  mounted: function() {
    this.$store.dispatch(CONSTANT.LOAD_ITEM_DETAIL, this.item_id);
  },
  data: function() {
    return {
      submenu: [
        {
          text: "돌아가기",
          badge: 0,
          type: "function",
          to: function() {
            history.back();
          }
        }
      ]
    };
  },
  computed: mapState(["item", "user"]),
  methods: {
    apply: function() {
      this.$store.dispatch(CONSTANT.APPLY_ITEM, this.item_id);
    },
    cancel: function() {
      this.$store.dispatch(CONSTANT.CANCEL_ITEM, this.item_id);
    }
  }
};
</script>

<style scoped>
@media (max-width: 480px) {
  .meta.writer {
    margin-top: 60px;
  }
}

span.anchor {
  display: block;
  position: relative;
  top: -60px;
  visibility: hidden;
}

.alert > a {
  text-decoration: none;
  color: inherit;
}
.alert > a:hover {
  color: inherit;
  filter: brightness(20%);
}

.card {
  margin-top: 10px;
  box-sizing: border-box;
  border-radius: 2px;
  background-clip: padding-box;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
}

.card span.card-title {
  color: #fff;
  font-size: 24px;
  font-weight: 300;
  text-transform: uppercase;
}

.card .card-image {
  position: relative;
  overflow: hidden;
  max-height: 300px;
  margin-bottom: 8px;
}

.card .card-image img {
  width: 100%;
  border-radius: 2px 2px 0 0;
  background-clip: padding-box;
  filter: brightness(50%);
  position: relative;
  z-index: 0;
}
.card .card-image span.card-title {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 16px;
  z-index: 1;
}
.card .card-content {
  padding: 8px 16px;
  border-radius: 0 0 2px 2px;
  background-clip: padding-box;
  box-sizing: border-box;
}
.card .card-content p {
  margin: 0;
  color: inherit;
}
.card .card-content span.card-title {
  line-height: 48px;
}
.card .card-action {
  border-top: 1px solid rgba(160, 160, 160, 0.2);
  padding: 16px;
}
.card .card-action a {
  outline: none;
  cursor: pointer;
  color: #ffab40;
  float: right;
  margin-left: 16px;
  transition: color 0.3s ease;
  text-transform: uppercase;
}
.card .card-action a:hover {
  color: #ffd8a6;
  text-decoration: none;
}
.card .detail {
  font-size: 15px;
  font-family: Arial, Helvetica, sans-serif;
}

.meta {
  font-size: 15px;
  color: rgba(0, 0, 0, 0.5);
}

.meta a,
.meta span {
  text-decoration: none;
  font-size: 17px;
  color: rgba(0, 0, 0, 0.7);
}

.meta a:hover {
  color: rgba(0, 0, 0, 0.9);
}

.progress {
  position: relative;
  width: 100%;
  height: 30px;
  margin: auto;
}
.progress > .progress-type {
  position: absolute;
  left: 0px;
  font-size: 13px;
  padding: 6px 30px 5px 10px;
  color: rgb(255, 255, 255);
  background-color: rgba(25, 25, 25, 0.2);
}
.progress > .progress-completed {
  position: absolute;
  right: 0px;
  font-size: 13px;
  padding: 6px 10px 5px;
}
</style>
