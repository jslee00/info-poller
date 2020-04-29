import CONFIG from "../config";

export default {
  flash: {
    login: "",
    adminSignUp: "",
    userSignUp: "",
    editUserInfo: ""
  },
  isLoading: false,
  user: { _id: 0, group: [] },
  userInfo: { _id: 0, group: [] },
  poll: {
    writer: {
      _id: 0
    },
    target: {}
  },
  pollList: [],
  item: {
    writer: {
      _id: 0
    },
    week: [],
    tags: []
  },
  itemList: []
};
