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
              <span class="card-title">미적분 I</span>
            </div>
            <div id="leader" class="card-content">
              <week-badge :week="['월']" class="float-right"></week-badge>
              <div class="meta writer">
                개설한 사람: <router-link :to="{name:'home'}">홍길동 선생님</router-link>
              </div>
              <div class="meta leader">
                진행하는 사람: <router-link :to="{name:'home'}">홍길동 선생님</router-link>
              </div>
            </div>
            <div class="card-action">
              <span id="intro" class="anchor"></span>
              <p>강의 간단 소개</p>
            </div>
            <div class="card-content">
              <div class="progress">
                <div class="progress-bar progress-bar-striped bg-danger" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div>
                <span class="progress-type">강좌 이름</span>
                <span class="progress-completed">0% 신청 완료!</span>
              </div>
            </div>
            <div class="card-content small">
              <span class="float-right imminent"><i class="fas fa-users"></i> 75 / 80</span>
            </div>
            <div class="card-content small pt-0">
              <span class="float-right imminent">2018/02/03 00:00:00 ~ 2018/02/19 00:00:00</span>
            </div>
            <div class="card-action">
              <router-link :to="{name:'home'}">신청!</router-link>
              <router-link :to="{name:'home'}">찜하기</router-link>
            </div>
            <div class="card-content">
              <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>신청 완료!</strong> <router-link class="ml-2" :to="{name:'home'}">신청한 항목 확인하러 가기 <i class="fas fa-link"></i></router-link>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>찜 완료!</strong> <router-link class="ml-2" :to="{name:'home'}">찜한 항목 확인하러 가기 <i class="fas fa-link"></i></router-link>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
            <div class="card-action">
              <span id="detail" class="anchor"></span>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
              <p>강의 설명이 너무 길어</p>
            </div>
          </div>
        </div>
      </div>
    </div><!-- .container -->
  </div>
</template>

<script>
import NavScroller from "./NavScroller";
import WeekBadge from "./WeekBadge";

export default {
  name: "item-detail",
  props: ["s"],
  components: { NavScroller, WeekBadge },
  data: function() {
    return {
      submenu: [
        {
          text: "Top",
          badge: 0,
          type: "link",
          to: "#"
        },
        {
          text: "Title",
          badge: 0,
          type: "link",
          to: "#title"
        },
        {
          text: "Intro",
          badge: 0,
          type: "link",
          to: "#intro"
        },
        {
          text: "Detail",
          badge: 0,
          type: "link",
          to: "#detail"
        }
      ]
    };
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
  font-weight: bold;
  padding: 6px 10px 5px;
}
</style>
