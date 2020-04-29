<template>
  <div>
    <nav-scroller :submenu="submenu"></nav-scroller>
    <div class="container-fluid">
      <div class="row">
        <!-- Card Projects -->
        <div class="col-12">
          <div class="card">
            <div class="card-content">
              <span class="card-title">항목 추가하기</span>
            </div>
            <div id="leader" class="card-content">
              <week-badge :input="true" :week="item.week" class="float-right"></week-badge>
              <div class="meta">
                개설한 사람: <span>홍길동 선생님</span>
              </div>
            </div>
            <div class="card-action small">
              <p class="mt-0">제목:</p>
              <input type="text" name="leader" class="form-control" placeholder="제목" v-model="item.title">
              <p>진행하는 사람:</p>
              <input type="text" name="leader" class="form-control" placeholder="진행하는 사람" v-model="item.leader">
              <p>소개:</p>
              <textarea class="form-control" name="intro" placeholder="간단한 소개" rows="3" v-model="item.intro"></textarea>
              <p>모집 인원</p>
              <div class="input-group">
                <div class="input-group-prepend">
                  <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown">
                    <span id="select-concept" v-if="item.maxApply == -1">무제한</span>
                    <span id="select-concept" v-else>선착순</span>
                  </button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" @click="changeMaxApply(-1)">무제한</a>
                    <a class="dropdown-item" @click="changeMaxApply(0)">선착순</a>
                  </div>
                </div>
                <input id="select-target" type="text" class="form-control" v-if="item.maxApply == -1" placeholder="제한 없음" disabled>
                <input id="select-target" type="number" class="form-control" v-else v-model="item.maxApply" placeholder="사람 수">
              </div>
              <p>태그:</p>
              <span class="tags" v-for="(tag, index) in item.tags" :key="index">{{ tag }}</span>
              <button class="btn btn-sm btn-outline-info" @click="changeTags">변경</button>
              <router-view></router-view>
            </div>
            <div class="card-action">
              <span id="detail" class="anchor"></span>
              <textarea class="form-control" name="intro" placeholder="자세한 설명" rows="20" v-model="item.description"></textarea>
            </div>
            <div class="card-action">
              <a @click="openItem">개설하기</a>
            </div>
          </div>
        </div>
      </div>
    </div><!-- .container -->
  </div>
</template>

<script>
import CONSTANT from "../constant";

import NavScroller from "./NavScroller";
import WeekBadge from "./WeekBadge";

export default {
  name: "introduce",
  props: ["poll_id"],
  components: { NavScroller, WeekBadge },
  data: function() {
    return {
      submenu: [
        {
          text: "조사 개설하기",
          badge: 0,
          to: { name: "openPoll" }
        },
        {
          text: "항목 추가하기",
          badge: 0,
          to: { name: "openItemPollList" }
        }
      ],
      item: {
        title: "",
        intro: "",
        week: [],
        leader: "",
        description: "",
        maxApply: -1,
        tags: []
      }
    };
  },
  methods: {
    changeMaxApply: function(maxApply) {
      this.item.maxApply = maxApply;
    },
    openItem: function() {
      this.$store.dispatch(CONSTANT.OPEN_ITEM, {
        ...this.item,
        poll: this.poll_id
      });
    },
    changeTags: function() {
      alert("준비 중인 기능입니다.");
    }
  }
};
</script>

<style scoped>
.card {
  margin-top: 10px;
  box-sizing: border-box;
  border-radius: 2px;
  background-clip: padding-box;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
}

.card span.card-title {
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;
}
.card .card-content {
  padding: 8px 16px;
  border-radius: 0 0 2px 2px;
  background-clip: padding-box;
  box-sizing: border-box;
}
.card .card-content span.card-title {
  line-height: 48px;
}
.card .card-action {
  border-top: 1px solid rgba(160, 160, 160, 0.2);
  padding: 16px;
}
.card .card-action > a {
  outline: none;
  cursor: pointer;
  color: #ffab40;
  float: right;
  margin-left: 16px;
  transition: color 0.3s ease;
  text-transform: uppercase;
}
.card .card-action p {
  margin-top: 10px;
  margin-bottom: 0;
  color: inherit;
}
.card .card-action > a:hover {
  color: #ffd8a6;
  text-decoration: none;
}

span.tags {
  background: #1abc9c;
  border: 1px solid #1abc9c;
  border-radius: 2px;
  display: inline-block;
  color: #f5f5f5;
  font-size: 0.875rem;
  font-weight: bold;
  line-height: 1.5;
  margin-right: 6px;
  padding: 0.25rem 0.5rem;
  vertical-align: middle;
}

.meta {
  font-size: 15px;
  color: rgba(0, 0, 0, 0.5);
}

.meta span {
  text-decoration: none;
  font-size: 17px;
  color: rgba(0, 0, 0, 0.9);
}
</style>
