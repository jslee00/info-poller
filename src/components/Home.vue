<template>
  <div>
    <nav-scroller :submenu="submenu"></nav-scroller>
    <div class="container-fluid">
      <div class="d-flex align-items-center p-3 my-4 text-white-50 bg-skyblue rounded box-shadow">
          <img src="../assets/images/book.png" alt="" class="mr-3 rounded" width="48" height="48">
        <div class="lh-100">
          <h6 class="mb-0 text-white lh-100">Poller</h6>
          <small>초간단 조사 관리 시스템</small>
        </div>
      </div>
      <div class="my-3 p-3 bg-white rounded box-shadow itemlist" v-if="pollList.length != 0">
        <h6 class="border-bottom border-gray pb-2 mb-0">최근 개설된 조사</h6>
        <router-link :to="{name:'pollDetail', params:{poll_id:poll._id}}" v-for="poll in sortedPollList('new', 3)" :key="poll._id">
          <div class="media text-muted pt-3">
            <img src="../assets/images/book.png" alt="" class="mr-2 rounded" width="32" height="32">
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
        <small class="d-block text-right mt-3">
          <router-link :to="{name:'pollList', query:{o:'new'}}" tabindex="0">더 보기</router-link>
        </small>
      </div>
      <!-- <div class="my-3 p-3 bg-white rounded box-shadow itemlist">
        <h6 class="border-bottom border-gray pb-2 mb-0">많은 사람이 참여한 조사</h6>
        <router-link :to="{name:'pollDetail', params:{poll_id:'1'}}">
          <div class="media text-muted pt-3">
            <img src="../assets/images/book.png" alt="" class="mr-2 rounded" width="32" height="32">
            <div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
              <strong class="title text-gray-dark">2018년도 1학기 방과후 조사</strong>
              <span class="subtitle ml-2 text-muted">홍길동 선생님</span>
              <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
              <span class="imminent"><i class="fas fa-calendar-alt"></i> 2018/02/03~2018/02/19</span>
              <span class="ml-3"><i class="fas fa-sitemap"></i> 3</span>
              <div class="mt-2"><i class="fas fa-dot-circle"></i> 대덕소프트웨어마이스터고 2학년</div>
            </div>
          </div>
        </router-link>
        <small class="d-block text-right mt-3">
          <router-link :to="{name:'pollList', query:{o:'hot'}}" tabindex="0">더 보기</router-link>
        </small>
      </div> -->
      <div class="my-3 p-3 bg-white rounded box-shadow itemlist" v-if="pollList.length != 0">
        <h6 class="border-bottom border-gray pb-2 mb-0">마감 시간이 임박한 조사</h6>
        <router-link :to="{name:'pollDetail', params:{poll_id:poll._id}}" v-for="poll in sortedPollList('imminent', 3)" :key="poll._id">
          <div class="media text-muted pt-3">
            <img src="../assets/images/book.png" alt="" class="mr-2 rounded" width="32" height="32">
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
        <small class="d-block text-right mt-3">
          <router-link :to="{name:'pollList', query:{o:'imminent'}}" tabindex="0">더 보기</router-link>
        </small>
      </div>
      <div class="my-3 p-3 bg-white rounded box-shadow itemlist" v-else>
        <h6 class="border-bottom border-gray pb-2 mb-0">조사가 없습니다!</h6>
        <small class="d-block text-right mt-3">
          <router-link :to="{name:'openPoll'}" tabindex="0" v-if="user.rank == 'admin'">조사 개설하기</router-link>
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import CONSTANT from "../constant";

import NavScroller from "./NavScroller";

export default {
  name: "home",
  components: { NavScroller },
  mounted: function() {
    this.$store.dispatch(CONSTANT.LOAD_POLL_LIST, {
      query: {
        endDateTime: { $gt: Date.now() }
      }
    });
  },
  data: function() {
    return {
      submenu: [
        {
          text: "Home",
          badge: 0,
          to: { name: "home" }
        },
        {
          text: "Link",
          badge: 0,
          type: "link",
          newPage: true,
          to: "https://www.naver.com"
        }
      ]
    };
  },
  methods: {
    sortedPollList: function(order, max) {
      var pollList = [...this.pollList];

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
        .slice(0, max);
    }
  },
  computed: mapState(["user", "pollList"])
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
