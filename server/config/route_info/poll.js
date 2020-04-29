module.exports = [
  {
    file: "./poll",
    path: "/poll/:id",
    method: "get",
    type: "GET"
  },
  {
    file: "./poll",
    path: "/poll",
    method: "add",
    type: "POST"
  },
  {
    file: "./poll",
    path: "/poll/:id",
    method: "edit",
    type: "PUT"
  },
  {
    file: "./poll",
    path: "/poll/:id",
    method: "delete",
    type: "DELETE"
  },
  {
    file: "./poll",
    path: "/poll",
    method: "list",
    type: "GET"
  }
];
