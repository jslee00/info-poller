import axios from "axios";

import store from "../store";
import CONFIG from "../config";

import UserProfile from "../components/user/UserProfile";
import UserInfo from "../components/user/UserInfo";
import EditUserInfo from "../components/user/EditUserInfo";
import SignUp from "../components/user/SignUp";
import UserSignUp from "../components/user/UserSignUp";
import AdminSignUp from "../components/user/AdminSignUp";
import Login from "../components/user/Login";
import Logout from "../components/user/Logout";
import MyPollList from "../components/user/MyPollList";

function isAuthenticated(is) {
  return function(to, from, next) {
    axios.get(CONFIG.LOAD_AUTH).then(response => {
      if ((response.data.user._id == undefined) == is) {
        next({
          name: "login"
        });
      } else {
        next();
      }
    });
  };
}

function submenu(user_id) {
  if (store.state.user._id != user_id) {
    return [
      {
        text: "돌아가기",
        badge: 0,
        type: "function",
        to: function() {
          history.back();
        }
      }
    ];
  } else {
    var submenu = [
      {
        text: "정보",
        badge: 0,
        to: {
          name: "userInfo",
          params: { user_id: user_id }
        }
      },
      {
        text: "수정하기",
        badge: 0,
        to: { name: "editUserInfo", params: { user_id: user_id } }
      },
      {
        text: "응답 완료 목록",
        badge: 0,
        to: {
          name: "myPollList",
          params: { user_id: user_id },
          query: { param: "applied" }
        },
        type: "exact"
      },
      {
        text: "응답 종료 목록",
        badge: 0,
        to: {
          name: "myPollList",
          params: { user_id: user_id },
          query: { param: "completed" }
        },
        type: "exact"
      }
    ];
    if (store.state.user.rank == "user") {
      return submenu;
    } else if (store.state.user.rank == "admin") {
      submenu.push(
        {
          text: "응답 중인 조사",
          badge: 0,
          to: {
            name: "myPollList",
            params: { user_id: user_id },
            query: { param: "proceeding" }
          },
          type: "exact"
        },
        {
          text: "마감된 조사",
          badge: 0,
          to: {
            name: "myPollList",
            params: { user_id: user_id },
            query: { param: "ended" }
          },
          type: "exact"
        }
      );
      return submenu;
    }
  }
}

export default [
  {
    path: "/user/profile/:user_id",
    name: "userProfile",
    component: UserProfile,
    props: true,
    beforeEnter: isAuthenticated(true)
  },
  {
    path: "/user/info/:user_id",
    name: "userInfo",
    component: UserInfo,
    props: function(route) {
      return {
        submenu: submenu(route.params.user_id),
        user_id: route.params.user_id
      };
    },
    beforeEnter: isAuthenticated(true)
  },
  {
    path: "/user/edit/:user_id",
    name: "editUserInfo",
    component: EditUserInfo,
    props: function(route) {
      return {
        submenu: submenu(route.params.user_id),
        user_id: route.params.user_id
      };
    },
    beforeEnter: isAuthenticated(true)
  },
  {
    path: "/user/poll/:user_id",
    name: "myPollList",
    component: MyPollList,
    props: function(route) {
      return {
        submenu: submenu(route.params.user_id),
        user_id: route.params.user_id,
        param: route.query.param
      };
    },
    beforeEnter: isAuthenticated(true)
  },
  {
    path: "/signup",
    name: "signUp",
    component: SignUp,
    beforeEnter: isAuthenticated(false)
  },
  {
    path: "/signup/user",
    name: "userSignUp",
    component: UserSignUp,
    beforeEnter: isAuthenticated(false)
  },
  {
    path: "/signup/admin",
    name: "adminSignUp",
    component: AdminSignUp,
    beforeEnter: isAuthenticated(false)
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    beforeEnter: function(to, from, next) {
      axios.get(CONFIG.LOAD_AUTH).then(response => {
        if (response.data.user._id == undefined) {
          next();
        } else {
          next({
            name: "home"
          });
        }
      });
    }
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout,
    beforeEnter: isAuthenticated(true)
  }
];
