<template>
  <div>
    <nav-scroller :submenu="submenu"></nav-scroller>
    <div class="container-fluid">
      <div class="d-flex align-items-center p-3 my-4 text-white-50 bg-skyblue rounded box-shadow">
          <img src="../assets/images/book.png" alt="" class="mr-3 rounded" width="48" height="48">
        <div class="lh-100">
          <h6 class="mb-0 text-white lh-100">FCFS</h6>
          <small>초간단 선착순 신청 관리 시스템</small>
        </div>
      </div>
      <div class="my-3 p-3 bg-white rounded box-shadow itemlist">
        <h6 class="border-bottom border-gray pb-2 mb-0">최근 추가된 항목</h6>
        <router-link :to="{name:'itemDetail', params:{item:'1'}}">
          <div class="media text-muted pt-3">
            <img src="../assets/images/book.png" alt="" class="mr-2 rounded" width="32" height="32">
            <div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
              <strong class="title text-gray-dark">미적분 I</strong>
              <span class="subtitle ml-2 text-muted">홍길동 선생님</span>
              <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
              <week-badge :week="['월']" class="d-inline-block"></week-badge>
              <span class="imminent ml-3"><i class="fas fa-users"></i> 75 / 80</span>
              <span class="imminent ml-3">2018/02/03~2018/02/19</span>
            </div>
          </div>
        </router-link>
        <small class="d-block text-right mt-3">
          <router-link :to="{name:'apply', query:{o:'new'}}" tabindex="0">더 보기</router-link>
        </small>
      </div>
      <div class="my-3 p-3 bg-white rounded box-shadow itemlist">
        <h6 class="border-bottom border-gray pb-2 mb-0">인기 항목</h6>
        <router-link :to="{name:'itemDetail', params:{item:'1'}}">
          <div class="media text-muted pt-3">
            <img src="../assets/images/book.png" alt="" class="mr-2 rounded" width="32" height="32">
            <div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
              <strong class="title text-gray-dark">미적분 I</strong>
              <span class="subtitle ml-2 text-muted">홍길동 선생님</span>
              <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
              <week-badge :week="['월']" class="d-inline-block"></week-badge>
              <span class="imminent ml-3"><i class="fas fa-users"></i> 75 / 80</span>
              <span class="imminent ml-3">2018/02/03~2018/02/19</span>
            </div>
          </div>
        </router-link>
        <small class="d-block text-right mt-3">
          <router-link :to="{name:'itemList', query:{o:'hot'}}" tabindex="0">더 보기</router-link>
        </small>
      </div>
      <div class="my-3 p-3 bg-white rounded box-shadow itemlist">
        <h6 class="border-bottom border-gray pb-2 mb-0">마감 시간이 임박한 항목</h6>
        <router-link :to="{name:'itemDetail', params:{item:'1'}}">
          <div class="media text-muted pt-3">
            <img src="../assets/images/book.png" alt="" class="mr-2 rounded" width="32" height="32">
            <div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
              <strong class="title text-gray-dark">미적분 I</strong>
              <span class="subtitle ml-2 text-muted">홍길동 선생님</span>
              <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
              <week-badge :week="['월']" class="d-inline-block"></week-badge>
              <span class="imminent ml-3"><i class="fas fa-users"></i> 75 / 80</span>
              <span class="imminent ml-3">2018/02/03~2018/02/19</span>
            </div>
          </div>
        </router-link>
        <small class="d-block text-right mt-3">
          <router-link :to="{name:'itemList', query:{o:'imminent'}}" tabindex="0">더 보기</router-link>
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import NavScroller from "./NavScroller";
import WeekBadge from "./WeekBadge";

export default {
  name: "home",
  props: ["s"],
  components: { NavScroller, WeekBadge },
  data: function() {
    return {
      submenu: [
        {
          text: "Home",
          badge: 0,
          to: { name: "home" }
        },
        {
          text: "Link1",
          badge: 0,
          type: "link",
          to: "https://www.naver.com"
        }
      ]
    };
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
