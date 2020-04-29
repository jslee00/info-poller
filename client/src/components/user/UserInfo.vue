<template>
  <div>
    <nav-scroller :submenu="submenu"></nav-scroller>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-md-10 col-lg-8">
          <div class="card">
            <div class="profile">
              <div class="row">
                <div class="col-9 mb-1">
                  <h2 class="mb-4"><i class="fas fa-user"></i> {{ userInfo.name }}</h2>
                  <p><strong>권한: </strong> {{ userInfo.rank }}</p>
                  <p><strong>소속: </strong> {{ userInfo.group[0] }}</p>
                  <p v-if="userInfo.rank == 'user'"><strong>학번: </strong> {{ userInfo.student_number.slice(0,1) + "학년 " + Number.parseInt(userInfo.student_number.slice(1,3)) + "반 " + Number.parseInt(userInfo.student_number.slice(3,5)) + "번 (" + userInfo.student_number + ")" }}</p>
                  <p><strong>이메일: </strong> {{ userInfo.email }}</p>
                  <p v-if="userInfo.rank == 'user'"><strong>관심사: </strong>
                    <!-- <span class="tags" v-for="(favorite, index) in userInfo.favorite" :key="index">{{ favorite }}</span> -->
                    준비 중인 기능입니다.
                  </p>
                </div>
                <div class="col-3 text-center user-icon">
                  <img v-if="userInfo.rank == 'user'" src="../../assets/images/student.png" alt="" class="rounded-circle img-fluid mt-3 mb-3">
                  <img v-else src="../../assets/images/settings.png" alt="" class="rounded-circle img-fluid mt-3 mb-3">
                </div>
              </div>
              <div class="row text-center">
                <div class="col-12 col-sm-4 emphasis">
                  <h2><strong>{{ userInfo.waitingPollCount }}</strong></h2>
                  <p><small>응답 대기 중</small></p>
                  <router-link class="btn btn-info btn-block" :to="{name:'pollList'}"><i class="fas fa-spinner mr-1"></i> 지금 응답하기</router-link>
                </div>
                <div class="col-12 col-sm-4 emphasis">
                  <h2><strong>{{ userInfo.appliedPollCount }}</strong></h2>
                  <p><small>응답 완료</small></p>
                  <router-link class="btn btn-success btn-block" :to="{name:'myPollList', params:{user_id:userInfo._id}, query:{param:'applied'}}"><i class="fas fa-list-ul mr-1"></i> 응답 변경하기</router-link>
                </div>
                <div class="col-12 col-sm-4 emphasis">
                  <h2><strong>{{ userInfo.completedPollCount }}</strong></h2>
                  <p><small>응답 종료</small></p>
                  <router-link class="btn btn-primary btn-block" :to="{name:'myPollList', params:{user_id:userInfo._id}, query:{param:'completed'}}"><i class="fas fa-check-circle mr-1"></i> 지난 기록 보기</router-link>
                </div>
              </div><!-- .row -->
              <div class="row text-center mt-4" v-if="userInfo.rank == 'admin'">
                <div class="col-12 col-sm-6 emphasis">
                  <h2><strong>{{ userInfo.myPollCount }}</strong></h2>
                  <p><small>조사 중</small></p>
                  <router-link class="btn btn-primary btn-block" :to="{name:'myPollList', params:{user_id:userInfo._id}, query:{param:'proceeding'}}"><i class="fas fa-spinner mr-1"></i> 응답 중인 조사</router-link>
                </div>
                <div class="col-12 col-sm-6 emphasis">
                  <h2><strong>{{ userInfo.myCompletedPollCount }}</strong></h2>
                  <p><small>조사 완료</small></p>
                  <router-link class="btn btn-primary btn-block" :to="{name:'myPollList', params:{user_id:userInfo._id}, query:{param:'ended'}}"><i class="fas fa-check-circle mr-1"></i> 완료 목록 확인</router-link>
                </div>
              </div><!-- .row -->
            </div><!-- .profile -->
          </div><!-- .card -->
        </div>
      </div><!-- .row -->
    </div><!-- .container-fluid -->
  </div>
</template>

<script>
import { mapState } from "vuex";

import CONSTANT from "../../constant";

import NavScroller from "../NavScroller";

export default {
  name: "userInfo",
  props: ["submenu", "user_id"],
  components: { NavScroller },
  mounted: function() {
    this.$store.dispatch(CONSTANT.LOAD_USER_INFO, this.user_id);
  },
  computed: mapState(["user", "userInfo"])
};
</script>

<style scoped>
.card {
  margin-top: 10px;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 2px;
  background-clip: padding-box;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
}
.profile {
  min-height: 300px;
  display: inline-block;
}
.divider {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.emphasis {
  border-top: 4px solid transparent;
  padding-top: 10px;
}
.emphasis:hover {
  border-top: 4px solid #1abc9c;
}
.emphasis h2 {
  margin-bottom: 0;
}
span.tags {
  background: #1abc9c;
  border-radius: 2px;
  color: #f5f5f5;
  font-weight: bold;
  margin-right: 4px;
  padding: 2px 4px;
}

.user-icon {
  margin-top: 3.5rem;
}

.dropdown-menu {
  background-color: #34495e;
  box-shadow: none;
  -webkit-box-shadow: none;
  width: 250px;
  margin-left: -16px;
}
.dropdown-menu .divider {
  background: none;
}
.dropdown-menu > li > a {
  color: #f5f5f5;
}
.dropup .dropdown-menu {
  padding: 15px;
}
.dropup .dropdown-menu:before {
  content: "";
  border-top: 10px solid #34495e;
  border-right: 10px solid transparent;
  border-left: 10px solid transparent;
  position: absolute;
  bottom: -10px;
  left: 50%;
  margin-left: -10px;
  z-index: 10;
}
</style>
