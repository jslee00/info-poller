<template>
  <div>
    <nav-scroller :submenu="submenu"></nav-scroller>
    <div class="container-fluid">
      <div class="row" v-if="result.length != 0">
        <div class="col-sm-6 col-md-4 col-lg-3 mt-4" v-for="poll in result" :key="poll._id">
          <router-link class="item" :to="(mode=='apply')?({name:'pollDetail', params:{poll_id:poll._id}}):({name:'openItem', params:{poll_id:poll._id}})">
            <div class="card">
              <div class="card-img-wrapper">
                <img class="card-img" v-if="poll.image" :src="poll.image">
              </div>
              <div class="card-block">
                <h4 class="card-title">{{ poll.title }}</h4>
                <div class="meta">
                  <router-link :to="{name:'userProfile', params:{user_id:poll.writer._id}}">{{ poll.writer.name }}</router-link>
                </div>
                <div class="card-text">
                  {{ poll.intro }}
                </div>
              </div>
              <div class="card-footer">
                <span class="imminent float-left" v-if="poll.target.param != 'unlimited'"><i class="fas fa-users"></i> {{ poll.currentApply }} / {{ poll.maxApply }}</span>
                <span class="imminent float-left" v-else><i class="fas fa-users"></i> {{ poll.currentApply }} / &#x221E;</span>
                <span class="imminent float-right"><i class="fas fa-calendar-alt"></i> {{ poll.startDate }}~{{ poll.endDate }}</span>
                <div class="clearfix"></div>
                <div class="float-left mt-2">
                  <span><i class="fas fa-sitemap"></i> {{ poll.itemCount }}</span>
                  <span class="ml-3"><i class="fas fa-dot-circle"></i> {{ (poll.target.param == "unlimited")?('무제한'):(poll.target.value) }}</span>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div><!-- .row -->
      <div class="row justify-content-center mt-4" v-else>
        <div class="col-8">
          <div class="card">
            <div class="card-block">
              <div class="warning-title">조사가 없습니다!</div>
            </div>
            <div class="card-footer">
              <router-link class="warning-link float-right" :to="{name:'openPoll'}" v-if="user.rank == 'admin'">조사 개설하기</router-link>
            </div>
          </div>
        </div>
      </div>
      <search-bar class="mt-5" :params="searchBarParams" @search="search"></search-bar>
    </div><!-- .container-fluid -->
  </div>
</template>

<script>
import { mapState } from "vuex";

import CONSTANT from "../constant";

import NavScroller from "./NavScroller";
import SearchBar from "./SearchBar";

export default {
  name: "poll-list",
  props: ["o", "p", "v", "mode", "submenu"],
  components: { NavScroller, SearchBar },
  mounted: function() {
    this.$store.dispatch(CONSTANT.LOAD_POLL_LIST, {
      query: {
        endDateTime: { $gt: Date.now() }
      },
      applied: false
    });
  },
  data: function() {
    return {
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
          text: "개설자",
          href: "#writer"
        },
        {
          text: "전체",
          href: "#all",
          default: true
        }
      ],
      result: []
    };
  },
  computed: mapState(["user", "pollList"]),
  methods: {
    search: function(param, value) {
      this.result = [];
      for (var i in this.pollList) {
        if (
          param == "" ||
          value == "" ||
          (param == "title" && this.pollList[i].title.includes(value)) ||
          (param == "intro" && this.pollList[i].intro.includes(value)) ||
          (param == "writer" && this.pollList[i].writer.name.includes(value)) ||
          (param == "all" &&
            (this.pollList[i].title.includes(value) ||
              this.pollList[i].intro.includes(value) ||
              this.pollList[i].writer.name.includes(value)))
        ) {
          this.result.push(this.pollList[i]);
        }
      }
    }
  },
  watch: {
    pollList: function() {
      this.result = [...this.pollList];
      var o = this.o;

      this.result = this.result.sort(function(a, b) {
        if (o == "new") {
          return Date.parse(b.created) - Date.parse(a.created);
        } else if (o == "imminent") {
          return (
            Date.parse(a.endDateTime) -
            Date.now() -
            (Date.parse(b.endDateTime) - Date.now())
          );
        } else {
          return Date.parse(b.created) - Date.parse(a.created);
        }
      });
    }
  }
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
.meta a {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.4);
}
.meta a:hover {
  color: rgba(0, 0, 0, 0.87);
}

.warning-title {
  padding: 50px 0;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
}
.warning-link {
  text-decoration: none;
}
</style>
