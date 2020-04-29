import CONSTANT from "../constant";

export default {
  [CONSTANT.LOGOUT]: state => {
    state.user = {};
  },
  [CONSTANT.LOAD_AUTH]: (state, payload) => {
    state.user = payload;
  },
  [CONSTANT.LOAD_USER_INFO]: (state, payload) => {
    state.userInfo = payload;
  },
  [CONSTANT.LOAD_POLL_LIST]: (state, payload) => {
    state.pollList = payload;
  },
  [CONSTANT.LOAD_POLL_DETAIL]: (state, payload) => {
    state.poll = payload;
  },
  [CONSTANT.LOAD_ITEM_LIST]: (state, payload) => {
    state.itemList = payload;
  },
  [CONSTANT.LOAD_ITEM_DETAIL]: (state, payload) => {
    state.item = payload;
  },
  [CONSTANT.CHANGE_FLASH]: (state, payload) => {
    state.flash[payload.name] = payload.message;
  },
  [CONSTANT.CHANGE_ISLOADING]: (state, payload) => {
    state.isLoading = payload;
  }
};
