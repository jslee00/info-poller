var loadUser = require("./loadUser");

module.exports = function(req, res) {
  if (req.isAuthenticated()) {
    var user_id = req.user._id;
    return loadUser(req, user_id).then(function(user) {
      res.send({
        status: "success",
        user: user
      });
    });
  } else {
    return res.send({
      status: "success",
      user: {}
    });
  }
};
