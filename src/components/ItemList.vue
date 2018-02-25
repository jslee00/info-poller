<template>
  <div>
    <nav-scroller :submenu="submenu"></nav-scroller>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6 col-md-4 col-lg-3 mt-4">
          <router-link class="item" :to="{name:'itemDetail', params:{item:1}}">
            <div id="item-1" class="card">
              <img class="card-img-top" src="http://success-at-work.com/wp-content/uploads/2015/04/free-stock-photos.gif">
              <div class="card-block">
                <h4 class="card-title">미적분 I</h4>
                <div class="meta">
                  <router-link :to="{name:'home'}">홍길동 선생님</router-link>
                </div>
                <div class="card-text">
                  강좌 소개가 너무 길어강좌 소개가 너무 길어강좌 소개가 너무 길어강좌 소개가 너무 길어강좌 소개가 너무 길어강좌 소개가 너무 길어강좌 소개가 너무 길어강좌 소개가 너무 길어강좌 소개가 너무 길어강좌 소개가 너무 길어강좌 소개가 너무 길어강좌 소개가 너무 길어강좌 소개가 너무 길어강좌 소개가 너무 길어강좌 소개가 너무 길어강좌 소개가 너무 길어강좌 소개가 너무 길어강좌 소개가 너무 길어강좌 소개가 너무 길어강좌 소개가 너무 길어강좌 소개가 너무 길어강좌 소개가 너무 길
                </div>
                <div class="card-badge">
                  <week-badge :week="['월','수']"></week-badge>
                </div>
              </div>
              <div class="card-footer">
                <span class="imminent"><i class="fas fa-users"></i> 75 / 80</span>
                <span class="imminent float-right">2018/02/03~2018/02/19</span>
              </div>
            </div>
          </router-link>
        </div>
      </div><!-- .row -->
      <search-bar class="mt-5"></search-bar>
    </div><!-- .container-fluid -->
  </div>
</template>

<script>
import NavScroller from "./NavScroller";
import SearchBar from "./SearchBar";
import WeekBadge from "./WeekBadge";

export default {
  name: "item-list",
  props: ["o"],
  components: { NavScroller, SearchBar, WeekBadge },
  data: function() {
    return {
      submenu: [
        {
          text: "최신",
          badge: 0,
          to: { name: "itemList", query: { o: "new" } }
        },
        {
          text: "인기",
          badge: 0,
          to: { name: "itemList", query: { o: "hot" } }
        },
        {
          text: "마감 임박",
          badge: 0,
          to: { name: "itemList", query: { o: "imminent" } }
        }
      ]
    };
  }
};
</script>

<style scoped>
.item {
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

.card-img-top {
  display: block;
  width: 100%;
  height: auto;
}

.card-title {
  display: inline-block;
  text-decoration: none;
  color: rgba(0, 0, 0, 1);
  font-size: 18px;
  font-weight: 700;
  line-height: 23px;
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

.meta a {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.4);
}

.meta a:hover {
  color: rgba(0, 0, 0, 0.87);
}
</style>
