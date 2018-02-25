<template>
  <div>
    <nav-scroller :submenu="submenu"></nav-scroller>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-md-10 col-lg-8">
          <div class="card">
            <div class="well profile">
              <div class="row">
                <div class="col-12 col-sm-6 mb-1">
                  <h2 class="mb-4">계정 이름</h2>
                  <p><strong>권한: </strong> Student </p>
                  <p><strong>소속: </strong> 대덕소프트웨어마이스터고등학교 </p>
                  <p><strong>학번: </strong> 2학년 4반 12번 (20412) </p>
                  <p><strong>이름: </strong> 이재석 </p>
                  <p><strong>이메일: </strong> leeneiwiso@gmail.com </p>
                  <p><strong>관심사: </strong>
                    <span class="tags">정보보안</span> 
                    <span class="tags">프로그래밍</span>
                    <span class="tags">웹</span>
                    <span class="tags">네트워크</span>
                  </p>
                </div>
                <div class="col-6 col-sm-3 text-center">
                  <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="" class="rounded-circle img-fluid mt-3 mb-3">
                </div>
                <div class="col-6 col-sm-3 text-center">
                  <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="" class="rounded-circle img-fluid mt-3 mb-3">
                </div>
              </div>
              <div class="row text-center">
                <div class="col-12 col-sm-4 emphasis">
                  <h2><strong>10</strong></h2>                    
                  <p><small>신청 완료</small></p>
                  <button class="btn btn-success btn-block"><i class="fas fa-list-ul mr-1"></i> 신청 목록 확인 </button>
                </div>
                <div class="col-12 col-sm-4 emphasis">
                  <h2><strong>2</strong></h2>                    
                  <p><small>진행 중</small></p>
                  <button class="btn btn-info btn-block"><i class="fas fa-spinner mr-1"></i> 진행 목록 확인 </button>
                </div>
                <div class="col-12 col-sm-4 emphasis">
                  <h2><strong>40</strong></h2>                    
                  <p><small>참가 완료</small></p>
                  <button class="btn btn-primary btn-block"><i class="fas fa-check-circle mr-1"></i> 완료 목록 확인 </button>
                </div>
              </div><!-- .row -->
            </div><!-- .profile -->
          </div><!-- .card -->
        </div>
      </div><!-- .row -->
      <div class="row justify-content-center">
        <div class="col-md-10 col-lg-8">
          <div class="card">
            <div class="well profile">
              <div class="row">
                <div class="col-12 col-sm-6 mb-1">
                  <h2 class="mb-4">계정 이름</h2>
                  <p><strong>권한: </strong> Admin </p>
                  <p><strong>소속: </strong> 대덕소프트웨어마이스터고등학교 </p>
                  <p><strong>이름: </strong> 이재석 </p>
                  <p><strong>이메일: </strong> leeneiwiso@gmail.com </p>
                </div>
                <div class="col-6 col-sm-3 text-center">
                  <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="" class="rounded-circle img-fluid mt-3 mb-3">
                </div>
                <div class="col-6 col-sm-3 text-center">
                  <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="" class="rounded-circle img-fluid mt-3 mb-3">
                </div>
              </div>
              <div class="row text-center">
                <div class="col-12 col-sm-4 emphasis">
                  <h2><strong>10</strong></h2>                    
                  <p><small>모집 중</small></p>
                  <button class="btn btn-success btn-block"><i class="fas fa-list-ul mr-1"></i> 모집 목록 확인 </button>
                </div>
                <div class="col-12 col-sm-4 emphasis">
                  <h2><strong>2</strong></h2>                    
                  <p><small>진행 중</small></p>
                  <button class="btn btn-info btn-block"><i class="fas fa-spinner mr-1"></i> 진행 목록 확인 </button>
                </div>
                <div class="col-12 col-sm-4 emphasis">
                  <h2><strong>40</strong></h2>                    
                  <p><small>진행 완료</small></p>
                  <button class="btn btn-primary btn-block"><i class="fas fa-check-circle mr-1"></i> 완료 목록 확인 </button>
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
import NavScroller from "./NavScroller";

export default {
  name: "user-info",
  props: ["username"],
  components: { NavScroller },
  mounted: function() {
    this.submenu[0].to.params.username = this.$store.state.username;
  },
  data: function() {
    return {
      submenu: [
        {
          text: "내 정보",
          badge: 0,
          to: { name: "userInfo", params: { username: undefined } }
        },
        {
          text: "수정하기",
          badge: 0,
          to: { name: "editUserInfo", params: { username: this.username } }
        }
      ]
    };
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
.profile {
  min-height: 300px;
  display: inline-block;
}
.divider {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.emphasis {
  border-top: 4px solid transparent;
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
  padding: 2px 4px;
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
