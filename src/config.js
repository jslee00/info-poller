var BASE_URL = "/api";

export default {
  LOGIN: BASE_URL + "/login",
  LOGOUT: BASE_URL + "/logout",
  LOAD_AUTH: BASE_URL + "/logined",
  SIGNUP: BASE_URL + "/signup",
  USER_INFO: BASE_URL + "/user/info/${id}",
  LOAD_USER_PROFILE: BASE_URL + "/user/profile/${id}",
  POLL: BASE_URL + "/poll/${id}",
  ITEM: BASE_URL + "/item/${id}",
  APPLY: BASE_URL + "/apply/${id}"
};
