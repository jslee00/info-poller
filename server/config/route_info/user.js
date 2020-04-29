module.exports = [
  {
    file: "./user",
    path: "/signup",
    method: "signup",
    type: "POST"
  },
  {
    file: "./user",
    path: "/login",
    method: "login",
    type: "POST"
  },
  {
    file: "./user",
    path: "/logout",
    method: "logout",
    type: "GET"
  },
  {
    file: "./user",
    path: "/logined",
    method: "logined",
    type: "GET"
  },
  {
    file: "./user",
    path: "/user/info/:user_id",
    method: "info",
    type: "GET"
  },
  {
    file: "./user",
    path: "/user/profile/:user_id",
    method: "profile",
    type: "GET"
  },
  {
    file: "./user",
    path: "/user/info/:user_id",
    method: "edit",
    type: "PUT"
  }
];
