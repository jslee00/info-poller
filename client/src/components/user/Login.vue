<template>
  <div>
    <nav-scroller :submenu="submenu"></nav-scroller>
    <div class="container">
      <div class="card card-container">
        <img id="profile-img" class="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png">
        <p id="profile-name" class="profile-name-card"></p>
        <form class="form-signin">
          <input type="text" id="inputEmail" class="form-control" placeholder="이메일 주소" v-model="loginInfo.email" required autofocus>
          <input type="password" id="inputPassword" class="form-control" placeholder="비밀번호" v-model="loginInfo.password" required @keyup.enter="login">
          <!-- <div class="checkbox">
            <label>
              <input type="checkbox" id="remember-me"><span class="remember-me">Remember me</span>
            </label>
          </div> -->
          <div class="flash-message text-center">{{ flash.login }}</div>
          <button type="button" class="btn btn-lg btn-primary btn-block btn-signin" @click="login">로그인</button>
          <!-- <button type="button" class="btn btn-lg btn-fb btn-block btn-signin" @click="loginWithFacebook"><i class="fab fa-facebook-f mr-1"></i> Facebook <span class="font-weight-light">으로 로그인</span></button> -->
        </form><!-- .form-signin -->
        <!-- <router-link :to="{name:'forgotPassword'}" class="forgot-password">
          비밀번호를 잊으셨나요?
        </router-link> -->
        <router-link :to="{name:'signUp'}" class="sign-up">
          회원이 아니신가요?
        </router-link>
      </div><!-- .card-container -->
    </div><!-- .container -->
  </div>
</template>

<script>
import { mapState } from "vuex";

import CONSTANT from "../../constant";

import NavScroller from "../NavScroller";

export default {
  name: "login",
  components: { NavScroller },
  data: function() {
    return {
      submenu: [
        {
          text: "Login",
          badge: 0,
          to: { name: "login" }
        },
        {
          text: "Sign Up",
          badge: 0,
          to: { name: "signUp" }
        }
      ],
      loginInfo: {
        email: "",
        password: ""
      }
    };
  },
  computed: mapState(["flash"]),
  methods: {
    login: function() {
      this.$store.dispatch(CONSTANT.LOGIN, this.loginInfo);
    },
    loginWithFacebook: function() {}
  }
};
</script>

<style scoped>
.container {
  padding-top: 5%;
}

.card-container.card {
  max-width: 350px;
  padding: 40px 40px;
}

.btn {
  height: 36px;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  cursor: default;
}

.flash-message {
  font-size: 14px;
  color: #ff6666;
  margin-bottom: 10px;
}

/* 
 * Card component
 */

.card {
  background-color: #f7f7f7;
  /* just in case there no content */
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  /* shadows and rounded borders */
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

/*
 * Form styles
 */

.profile-name-card {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin: 10px 0 0;
  min-height: 1em;
}

.reauth-email {
  display: block;
  color: #404040;
  line-height: 2;
  margin-bottom: 10px;
  font-size: 14px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.form-signin {
  margin-bottom: 10px;
}

.form-signin #inputEmail,
.form-signin #inputPassword {
  direction: ltr;
  height: 44px;
  font-size: 15px;
}

.form-signin input[type="email"],
.form-signin input[type="password"],
.form-signin input[type="text"],
.form-signin button {
  width: 100%;
  display: block;
  margin-bottom: 10px;
  z-index: 1;
  position: relative;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.form-signin .form-control:focus {
  border-color: rgb(104, 145, 162);
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgb(104, 145, 162);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgb(104, 145, 162);
}

.remember-me {
  margin-left: 5px;
  font-size: 13px;
}

.btn.btn-signin {
  background-color: rgb(114, 155, 172);
  padding: 0px;
  font-size: 14px;
  height: 36px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  border: none;
  -o-transition: all 0.218s;
  -moz-transition: all 0.218s;
  -webkit-transition: all 0.218s;
  transition: all 0.218s;
}

.btn.btn-signin:hover,
.btn.btn-signin:active,
.btn.btn-signin:focus {
  background-color: rgb(84, 125, 142);
}

.btn.btn-fb {
  color: #fff;
  background-color: #496ebc;
}

.forgot-password,
.sign-up {
  color: rgb(114, 155, 172);
  font-size: 14px;
}

.forgot-password:hover,
.forgot-password:active,
.forgot-password:focus,
.sign-up:hover,
.sign-up:active,
.sign-up:focus {
  color: rgb(84, 125, 142);
  text-decoration: none;
}
</style>
