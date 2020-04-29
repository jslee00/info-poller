module.exports = [
  {
    file: "./item",
    path: "/item/:id",
    method: "get",
    type: "GET"
  },
  {
    file: "./item",
    path: "/item",
    method: "add",
    type: "POST"
  },
  {
    file: "./item",
    path: "/item",
    method: "list",
    type: "GET"
  }
];
