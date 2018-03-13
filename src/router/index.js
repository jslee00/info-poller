import Vue from "vue";
import Router from "vue-router";
import _ from "lodash";

import Home from "../components/Home";
import NotFound from "../components/NotFound";

import apply from "./apply";
import user from "./user";
import open from "./open";
import introduce from "./introduce";

Vue.use(Router);

var router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "*",
      name: "notFound",
      component: NotFound
    }
  ].concat(apply, user, open, introduce)
});

router.beforeEach(function(to, from, next) {
  setTimeout(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, 10);
  next();
});

export default router;
