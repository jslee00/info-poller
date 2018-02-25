import User from "../components/User";
import UserInfo from "../components/UserInfo";
import EditUserInfo from "../components/EditUserInfo";

export default {
  path: "/user",
  name: "user",
  component: User,
  children: [
    {
      path: "info/:username",
      name: "userInfo",
      component: UserInfo,
      props: true
    },
    {
      path: "info/edit/:username",
      name: "editUserInfo",
      component: EditUserInfo,
      props: true
    }
  ]
};
