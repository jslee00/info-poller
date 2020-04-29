module.exports = function(req, res) {
  console.log("[ ] (user) logout called");
  req.logout();
  return res.send({
    status: "success"
  });
};
