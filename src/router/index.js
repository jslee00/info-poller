import Vue from "vue";
import Router from "vue-router";

import Home from "../components/Home";
import Login from "../components/Login";
import Open from "../components/Open";
import Introduce from "../components/Introduce";
import NotFound from "../components/NotFound";

import apply from "./apply";
import user from "./user";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      props: function(route) {
        return { s: route.query.s };
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/logout",
      name: "logout"
    },
    {
      path: "/open",
      name: "open",
      component: Open,
      props: function(route) {
        return { s: route.query.s };
      }
    },
    apply,
    user,
    {
      path: "/introduce",
      name: "introduce",
      component: Introduce
    },
    {
      path: "*",
      name: "notFound",
      component: NotFound
    }
  ]
});
