import axios from "axios";

import store from "../store";
import CONFIG from "../config";

import PollList from "../components/PollList";
import PollDetail from "../components/PollDetail";
import ItemList from "../components/ItemList";
import ItemDetail from "../components/ItemDetail";

function isAuthenticated(is) {
  return function(to, from, next) {
    store.state.flash.login = "로그인이 필요한 서비스입니다.";
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

export default [
  {
    path: "/apply",
    name: "pollList",
    component: PollList,
    props: route => {
      return {
        o: route.query.o,
        p: route.query.p,
        v: route.query.v,
        mode: "apply",
        submenu: [
          {
            text: "최신",
            badge: 0,
            to: { name: "pollList", query: { o: "new" } },
            type: "exact"
          },
          {
            text: "마감 임박",
            badge: 0,
            to: { name: "pollList", query: { o: "imminent" } },
            type: "exact"
          }
        ]
      };
    },
    beforeEnter: function(to, from, next) {
      if (!to.query.o) {
        next({ name: "pollList", query: { o: "new" } });
      } else {
        next();
      }
    }
  },
  {
    path: "/apply/:poll_id",
    name: "pollDetail",
    component: PollDetail,
    props: true,
    beforeEnter: isAuthenticated(true)
  },
  {
    path: "/apply/:poll_id/:item_id",
    name: "itemDetail",
    component: ItemDetail,
    props: true,
    beforeEnter: isAuthenticated(true)
  },
  {
    path: "/apply/search",
    name: "searchItem",
    component: ItemList,
    props: function(route) {
      return {};
    },
    beforeEnter: isAuthenticated(true)
  }
];
