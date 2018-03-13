<template>
  <div>
    <nav-scroller :submenu="submenu"></nav-scroller>
    <div class="container-fluid">
      <div class="row">
        <!-- Card Projects -->
        <div class="col-12">
          <div class="card">
            <div class="card-content">
              <span class="card-title">조사 개설하기</span>
            </div>
            <div id="leader" class="card-content">
              <div class="meta">
                개설한 사람: <span>{{ user.name }}</span>
              </div>
            </div>
            <div class="card-action small">
              <p class="mt-0">제목:</p>
              <input type="text" class="form-control" v-model="poll.title" placeholder="제목">
              <p>소개:</p>
              <textarea class="form-control" placeholder="간단한 소개" rows="3" v-model="poll.intro"></textarea>
              <p>모집 시작</p>
              <input type="date" class="form-control" required v-model="poll.startDate">
              <input type="time" class="form-control" step="1" required v-model="poll.startTime">
              <p>모집 마감</p>
              <input type="date" class="form-control" required v-model="poll.endDate">
              <input type="time" class="form-control" step="1" required v-model="poll.endTime">
              <p>모집 대상</p>
              <div class="input-group">
                <div class="input-group-prepend">
                  <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown">
                    <span id="select-concept" v-for="item in selectOption" :key="item.param" v-if="item.param == poll.target.param">{{ item.text }}</span>
                  </button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" v-for="item in selectOption" :key="item.param" @click="changeParam(item)">{{ item.text }}</a>
                  </div>
                </div>
                <input id="select-target" type="number" class="form-control" v-for="item in selectOption" :key="item.param" v-if="item.param == poll.target.param" v-model="poll.target.value" :placeholder="item.placeholder" :disabled="item.disabled">
              </div>
            </div>
            <div class="card-action">
              <a @click="openPoll">개설하기</a>
              <!-- <a @click="preparePoll">보류하기</a> -->
            </div>
          </div>
        </div>
      </div>
    </div><!-- .container -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

import CONSTANT from "../constant";

import NavScroller from "./NavScroller";

export default {
  name: "introduce",
  props: ["s"],
  components: { NavScroller },
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
      selectOption: [
        // {
        //   param: "select-group",
        //   text: "그룹 선택",
        //   placeholder: "그룹 검색...",
        //   inputType: "text"
        // },
        // {
        //   param: "select-people",
        //   text: "사람 선택",
        //   placeholder: "사람 검색...",
        //   inputType: "text"
        // },
        {
          param: "unlimited",
          text: "무제한",
          placeholder: "제한 없음",
          inputType: "text",
          disabled: true
        }
      ],
      poll: {
        title: "",
        startDate: moment(new Date()).format("YYYY-MM-DD"),
        startTime: moment(new Date()).format("HH:mm:ss"),
        endDate: moment(new Date()).format("YYYY-MM-DD"),
        endTime: moment(new Date()).format("HH:mm:ss"),
        target: { param: "unlimited", value: "" },
        intro: ""
      }
    };
  },
  methods: {
    changeParam: function(item) {
      this.poll.target.param = item.param;
    },
    openPoll: function() {
      this.$store.dispatch(CONSTANT.OPEN_POLL, this.poll);
    },
    preparePoll: function() {}
  },
  computed: mapState(["user"])
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
