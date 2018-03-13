import OpenPoll from "../components/OpenPoll";
import PollList from "../components/PollList";
import OpenItem from "../components/OpenItem";
import ChangeArrayModal from "../components/ChangeArrayModal";

export default [
  {
    path: "/open",
    name: "open",
    redirect: "/open/poll"
  },
  {
    path: "/open/poll",
    name: "openPoll",
    component: OpenPoll
  },
  {
    path: "/open/item",
    name: "openItemPollList",
    component: PollList,
    props: route => {
      return {
        mode: "openItem",
        submenu: [
          {
            text: "조사 개설하기",
            badge: 0,
            to: { name: "openPoll" }
          },
          {
            text: "항목 추가하기",
            badge: 0,
            to: { name: "openItemPollList" }
          }
        ]
      };
    }
  },
  {
    path: "/open/item/:poll_id",
    name: "openItem",
    component: OpenItem,
    props: true,
    children: [
      {
        path: "tags",
        name: "openItemChangeTags",
        component: ChangeArrayModal,
        props: function(route) {
          return { mode: "tags" };
        }
      }
    ]
  }
];
