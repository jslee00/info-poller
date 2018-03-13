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
                  <h2 class="mb-4"><i class="fas fa-user"></i> {{ userInfo.id }}</h2>
                  <p class="label"><strong>권한: </strong> {{ userInfo.rank }} <button class="btn btn-sm btn-outline-info ml-3" @click="requestUpgradeAccount">권한 상승 요청</button></p>
                  <p class="label"><strong>소속: </strong></p>
                  <input type="text" class="form-control" v-model="userInfo.group[0]">
                  <p class="label" v-if="userInfo.rank == 'user'"><strong>학번: </strong></p>
                  <input v-if="userInfo.rank == 'user'" type="text" class="form-control" v-model="userInfo.student_number">
                  <p class="label"><strong>이름: </strong></p>
                  <input type="text" class="form-control" v-model="userInfo.name">
                  <p class="label"><strong>이메일: </strong></p>
                  <input type="text" class="form-control" v-model="userInfo.email">
                  <p class="label" v-if="userInfo.rank == 'user'"><strong>관심사: </strong></p>
                  <span class="tags" v-for="(favorite, index) in userInfo.favorite" :key="index">{{ favorite }}</span>
                  <button class="btn btn-sm btn-outline-info" @click="changeFavorite">변경</button>
                  <router-view></router-view>
                </div>
                <div class="col-3 text-center user-icon">
                  <img v-if="userInfo.rank == 'user'" src="../../assets/images/student.png" alt="" class="rounded-circle img-fluid mt-3 mb-3">
                  <img v-else src="../../assets/images/settings.png" alt="" class="rounded-circle img-fluid mt-3 mb-3">
                </div>
              </div>
            </div><!-- .profile -->
            <div class="flash-message text-center">{{ flash.editUserInfo }}</div>
            <div class="card-action">
              <a @click="restoreUserInfo" tabindex="0">원래대로</a>
              <a @click="editUserInfo" tabindex="0">수정하기</a>
            </div>
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
  name: "editUserInfo",
  props: ["submenu", "user_id"],
  components: { NavScroller },
  mounted: function() {
    this.$store.dispatch(CONSTANT.LOAD_USER_INFO, this.user_id);
  },
  computed: mapState(["userInfo", "flash"]),
  methods: {
    addFavorite: function() {
      this.userInfo.favorite.push("");
    },
    deleteFavorite: function(index) {
      this.userInfo.favorite.splice(index, 1);
    },
    editUserInfo: function() {
      this.$store.dispatch(CONSTANT.EDIT_USER_INFO, this.userInfo);
    },
    restoreUserInfo: function() {
      this.$store.dispatch(CONSTANT.LOAD_USER_INFO, this.user_id);
    },
    requestUpgradeAccount: function() {
      // this.$store.dispatch(CONSTANT.REQUEST_UPGRADE_ACCOUNT);
      alert("준비 중인 기능입니다.");
    },
    changeFavorite: function() {
      alert("준비 중인 기능입니다.");
    }
  }
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
.card .card-action {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid rgba(160, 160, 160, 0.2);
}
.card .card-action > a {
  text-decoration: none;
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

.flash-message {
  font-size: 16px;
  color: #ff6666;
  margin-top: 10px;
  margin-bottom: 5px;
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

.profile {
  min-height: 300px;
  display: inline-block;
}
.profile p.label {
  margin-top: 15px;
  margin-bottom: 5px;
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
