<template>
  <div>
    <nav-scroller :submenu="submenu"></nav-scroller>
    <div class="container-fluid">
      <div class="d-flex align-items-center p-3 my-4 text-white-50 bg-skyblue rounded box-shadow">
          <img src="../../assets/images/book.png" alt="" class="mr-3 rounded" width="48" height="48">
        <div class="lh-100">
          <h6 class="mb-0 text-white lh-100">Poller</h6>
          <small>초간단 조사 관리 시스템</small>
        </div>
      </div>
      <div class="my-3 p-3 bg-white rounded box-shadow itemlist" v-if="user_id != undefined && param != undefined && pollList.length != 0">
        <h6 class="border-bottom border-gray pb-2 mb-0">{{ this.header }}</h6>
        <router-link :to="{name:'pollDetail', params:{poll_id:poll._id}}" v-for="poll in sortedPollList()" :key="poll._id">
          <div class="media text-muted pt-3">
            <img src="../../assets/images/book.png" alt="" class="mr-2 rounded" width="32" height="32">
            <div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
              <strong class="title text-gray-dark">{{ poll.title }}</strong>
              <span class="subtitle ml-2 text-muted">{{ poll.writer.name }}</span>
              <p>{{ poll.intro }}</p>
              <span class="imminent"><i class="fas fa-calendar-alt"></i> {{ poll.startDate }}~{{ poll.endDate }}</span>
              <span class="ml-3"><i class="fas fa-sitemap"></i> {{ poll.itemCount }}</span>
              <div class="mt-2"><i class="fas fa-dot-circle"></i> {{ (poll.target.param == "unlimited")?('무제한'):(poll.target.value) }}</div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="my-3 p-3 bg-white rounded box-shadow itemlist" v-else>
        <h6 class="border-bottom border-gray pb-2 mb-0">조사가 없습니다!</h6>
        <small class="d-block text-right mt-3">
          <a onclick="history.back()" tabindex="0">돌아가기</a>
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";

import CONSTANT from "../../constant";

import NavScroller from "../NavScroller";

function loadPollParams(param, user_id) {
  var query;
  var applied;

  if (param == "applied") {
    query = {
      endDateTime: { $gt: Date.now() }
    };
    applied = true;
  } else if (param == "completed") {
    query = {
      endDateTime: { $lte: Date.now() }
    };
    applied = true;
  } else if (param == "proceeding") {
    query = {
      writer: user_id,
      endDateTime: { $gt: Date.now() }
    };
  } else if (param == "ended") {
    query = {
      writer: user_id,
      endDateTime: { $lte: Date.now() }
    };
  }

  return { query, applied };
}

export default {
  name: "my-poll-list",
  props: ["submenu", "user_id", "param", "page", "list_size"],
  components: { NavScroller },
  mounted: function() {
    var params;

    if (this.param != undefined && this.user_id != undefined) {
      params = loadPollParams(this.param, this.user_id);
      this.$store.dispatch(CONSTANT.LOAD_POLL_LIST, params);
    }
  },
  computed: _.extend(mapState(["user", "pollList"]), {
    header: function() {
      if (this.param == "applied") {
        return "응답 완료 목록";
      } else if (this.param == "completed") {
        return "응답 종료 목록";
      } else if (this.param == "proceeding") {
        return "응답 중인 조사";
      } else if (this.param == "ended") {
        return "마감된 조사";
      }
    }
  }),
  methods: {
    sortedPollList: function(order) {
      var pollList = [...this.pollList];
      var page = this.page ? this.page : 1;
      var listSize = this.list_size ? this.list_size : 10;

      return pollList
        .sort(function(a, b) {
          if (order == "new") {
            return Date.parse(b.created) - Date.parse(a.created);
          } else if (order == "imminent") {
            return (
              Date.parse(a.endDateTime) -
              Date.now() -
              (Date.parse(b.endDateTime) - Date.now())
            );
          } else {
            return Date.parse(b.created) - Date.parse(a.created);
          }
        })
        .slice((page - 1) * listSize, page * listSize);
    }
  },
  watch: {
    param: function() {
      var params;

      if (this.param != undefined && this.user_id != undefined) {
        params = loadPollParams(this.param, this.user_id);
      }
      this.$store.dispatch(CONSTANT.LOAD_POLL_LIST, params);
    }
  }
};
</script>

<style scoped>
.text-white-50 {
  color: rgba(255, 255, 255, 0.5);
}
.bg-skyblue {
  background-color: #77beea;
}
.border-bottom {
  border-bottom: 1px solid #e5e5e5;
}

.itemlist > a {
  text-decoration: none;
}

.imminent {
  color: #ff6666;
}

.media {
  cursor: pointer;
}
.media:hover {
  background-color: #f0f0f0;
}
.media-body > .title {
  font-size: 15px;
}
.media-body > .subtitle {
  font-size: 12px;
}
.media-body > p {
  display: -webkit-box;
  height: 54.6px;
  margin-top: 8px;
  font-size: 14px;
  line-height: 1.4;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.lh-100 {
  line-height: 1;
}
.lh-125 {
  line-height: 1.25;
}
.lh-150 {
  line-height: 1.5;
}
</style>
