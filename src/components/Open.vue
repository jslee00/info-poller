<template>
  <div>
    <nav-scroller :submenu="submenu"></nav-scroller>
    <div class="container">
      <div class="row">
        <!-- Card Projects -->
        <div class="col-12">
          <div class="card">
            <div class="card-content">
              <span id="title" class="anchor"></span>
              <span class="card-title">개설하기</span>
            </div>
            <div id="leader" class="card-content">
              <week-badge :input="true" :week="[]" class="float-right"></week-badge>
              <div class="meta">
                개설한 사람: <span>홍길동 선생님</span>
              </div>
            </div>
            <div class="card-action small">
              <p class="mt-0">진행하는 사람:</p>
              <input type="text" name="leader" class="form-control">
              <span id="intro" class="anchor"></span>
              <p>간단한 소개:</p>
              <textarea class="form-control" name="intro" placeholder="간단한 소개" rows="3"></textarea>
              <p>모집 시작</p>
              <input type="date" class="form-control" name="startdate" required>
              <input type="time" class="form-control" name="starttime" required>
              <p>모집 마감</p>
              <input type="date" class="form-control" name="enddate" required>
              <input type="time" class="form-control" name="endtime" required>
              <p>모집 대상</p>
              <div class="input-group">
                <div class="input-group-prepend">
                  <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown">
                    <span id="select-concept">선착순</span>
                  </button>
                  <input type="hidden">
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="#fcfs">선착순</a>
                    <a class="dropdown-item" href="#select-group">그룹 선택</a>
                    <a class="dropdown-item" href="#select-people">사람 선택</a>
                    <a class="dropdown-item" href="#unlimited">무제한</a>
                  </div>
                </div>
                <input id="select-target" type="number" class="form-control" name="target" placeholder="사람 수">
              </div>
            </div>
            <div class="card-action">
              <span id="detail" class="anchor"></span>
              <textarea class="form-control" name="intro" placeholder="자세한 설명" rows="20"></textarea>
            </div>
            <div class="card-action">
              <router-link :to="{name:'home'}">신청!</router-link>
              <router-link :to="{name:'home'}">찜하기</router-link>
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
  name: "introduce",
  props: ["s"],
  components: { NavScroller, WeekBadge },
  data: function() {
    return {
      submenu: [
        {
          text: "개설하기",
          badge: 0,
          to: { name: "open" }
        }
      ]
    };
  },
  mounted: function() {
    $(".dropdown-menu")
      .find("a")
      .click(function(e) {
        e.preventDefault();
        var param = $(this)
          .attr("href")
          .replace("#", "");
        var concept = $(this).text();
        $("span#select-concept").text(concept);
        switch (param) {
          case "fcfs":
            $("#select-target").prop("disabled", false);
            $("#select-target").prop("placeholder", "사람 수");
            $("#select-target").prop("type", "number");
            break;
          case "select-group":
            $("#select-target").prop("disabled", false);
            $("#select-target").prop("placeholder", "그룹 검색...");
            $("#select-target").prop("type", "text");
            break;
          case "select-people":
            $("#select-target").prop("disabled", false);
            $("#select-target").prop("placeholder", "사람 검색...");
            $("#select-target").prop("type", "text");
            break;
          case "unlimited":
            $("#select-target").prop("disabled", true);
            break;
        }
      });
  }
};
</script>

<style scoped>
@media (max-width: 480px) {
  .meta {
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
  font-size: 24px;
  font-weight: bold;
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
.card .card-action p {
  margin-top: 10px;
  margin-bottom: 0;
  color: inherit;
}
.card .card-content span.card-title {
  line-height: 48px;
}
.card .card-action {
  border-top: 1px solid rgba(160, 160, 160, 0.2);
  padding: 16px;
}
.card .card-action > a {
  color: #ffab40;
  float: right;
  margin-left: 16px;
  transition: color 0.3s ease;
  text-transform: uppercase;
}
.card .card-action > a:hover {
  color: #ffd8a6;
  text-decoration: none;
}

.meta {
  font-size: 15px;
  color: rgba(0, 0, 0, 0.5);
}

.meta span {
  text-decoration: none;
  font-size: 17px;
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
