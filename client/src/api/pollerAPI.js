import CONFIG from "../config";
import axios from "axios";

export default {
  login: function(loginInfo) {
    return axios.post(CONFIG.LOGIN, loginInfo);
  },
  signUp: function(signUpInfo) {
    return axios.post(CONFIG.SIGNUP, signUpInfo);
  },
  logout: function() {
    return axios.get(CONFIG.LOGOUT);
  },
  loadUserInfo: function(id) {
    return axios.get(CONFIG.USER_INFO.replace("${id}", id));
  },
  loadUserProfile: function(id) {
    return axios.get(CONFIG.LOAD_USER_PROFILE.replace("${id}", id));
  },
  loadAuth: function() {
    return axios.get(CONFIG.LOAD_AUTH);
  },
  editUserInfo: function(user) {
    return axios.put(CONFIG.USER_INFO.replace("${id}", user._id), user);
  },
  loadPollList: function(params) {
    return axios.get(CONFIG.POLL.replace("${id}", ""), { params });
  },
  loadPollDetail: function(id) {
    return axios.get(CONFIG.POLL.replace("${id}", id));
  },
  openPoll: function(poll) {
    return axios.post(CONFIG.POLL.replace("${id}", ""), poll);
  },
  loadItemList: function(params) {
    return axios.get(CONFIG.ITEM.replace("${id}", ""), { params });
  },
  loadItemDetail: function(id) {
    return axios.get(CONFIG.ITEM.replace("${id}", id));
  },
  openItem: function(item) {
    return axios.post(CONFIG.ITEM.replace("${id}", ""), item);
  },
  applyItem: function(id) {
    return axios.post(CONFIG.APPLY.replace("${id}", id));
  },
  cancelItem: function(id) {
    return axios.delete(CONFIG.APPLY.replace("${id}", id));
  }
};
