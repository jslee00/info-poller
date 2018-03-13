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
              <img class="img-fluid" src="https://www.rd.com/wp-content/uploads/2017/09/01-Can-You-Pass-This-Elementary-School-Math-Test--760x506.jpg">
              <span class="card-title">{{ poll.title }}</span>
            </div>
            <div class="card-content">
              <div class="progress" v-if="poll.target.param != 'unlimited'">
                <div class="progress-bar progress-bar-striped" :class="{'bg-primary':((poll.currentApply / poll.maxApply >= 0) && (poll.currentApply / poll.maxApply < 0.33)),'bg-success':((poll.currentApply / poll.maxApply >= 0.33) && (poll.currentApply / poll.maxApply < 0.66)),'bg-warning':((poll.currentApply / poll.maxApply >= 0.66) && (poll.currentApply / poll.maxApply < 1)),'bg-danger':(poll.currentApply / poll.maxApply == 1)}" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" :style="'width:' + (poll.currentApply / poll.maxApply * 100) + '%'"></div>
                <span class="progress-type">{{ (poll.currentApply / poll.maxApply * 100).toFixed(2) }}% 참여 완료!</span>
                <span class="progress-completed"><i class="fas fa-users"></i> {{ poll.currentApply }} / {{ poll.maxApply }}</span>
              </div>
              <div class="progress" v-else>
                <div class="progress-bar progress-bar-striped disabled" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                <span class="progress-type">무제한!</span>
                <span class="progress-completed text-white"><i class="fas fa-users"></i> {{ poll.currentApply }} / &#x221E;</span>
              </div>
            </div>
            <div class="card-content pb-0">
              <span class="meta writer">
                개설한 사람: <router-link :to="{name:'userProfile', params:{user_id:poll.writer._id}}">{{ poll.writer.name }}</router-link>
              </span>
              <span class="float-right small imminent"><i class="fas fa-calendar-alt"></i> {{ poll.startDate + " " + poll.startTime }} ~ {{ poll.endDate + " " + poll.endTime }}</span>
            </div>
            <div class="card-content pt-0 pb-3">
              <span class="float-right small"><i class="fas fa-dot-circle"></i> {{ (poll.target.param == "unlimited")?('무제한'):(poll.target.value) }}</span>
            </div>
            <div class="card-action">
              <span id="intro" class="anchor"></span>
              <p>{{ poll.intro }}</p>
            </div>
            <div class="card-action">
              <search-bar :params="searchBarParams" @search="search"></search-bar>
              <item-list :poll="poll_id" :option="searchOption"></item-list>
            </div>
          </div>
        </div>
      </div>
    </div><!-- .container -->
  </div>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";

import CONSTANT from "../constant";

import NavScroller from "./NavScroller";
import SearchBar from "./SearchBar";
import ItemList from "./ItemList";

export default {
  name: "poll-detail",
  props: ["poll_id"],
  components: { NavScroller, SearchBar, ItemList },
  mounted: function() {
    $(".dropdown-menu")
      .find("a")
      .click(function(e) {
        e.preventDefault();
        var param = $(this)
          .attr("href")
          .replace("#", "");
        var concept = $(this).text();
        $("span#search-concept").text(concept);
        $("#search-param").val(param);
      });
    this.$store.dispatch(CONSTANT.LOAD_POLL_DETAIL, this.poll_id);
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
      ],
      searchBarParams: [
        {
          text: "제목",
          href: "#title"
        },
        {
          text: "소개",
          href: "#intro"
        },
        {
          text: "태그",
          href: "#tag"
        },
        {
          text: "진행자",
          href: "#leader"
        },
        {
          text: "전체",
          href: "#all",
          default: true
        }
      ],
      searchOption: {
        param: "",
        value: ""
      }
    };
  },
  computed: mapState(["poll", "itemList"]),
  methods: {
    search: function(param, value) {
      this.searchOption.param = param;
      this.searchOption.value = value;
    }
  }
};
</script>

<style scoped>
@media (max-width: 480px) {
  .meta.writer {
    margin-top: 30px;
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

.input-group .dropdown-menu .dropdown-item {
  color: #212529;
}
.input-group .dropdown-menu .dropdown-item:hover {
  color: #212529;
}

.meta {
  font-size: 15px;
  color: rgba(0, 0, 0, 0.5);
}

.meta a {
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
