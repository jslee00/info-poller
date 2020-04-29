var loadUser = require("./loadUser");

module.exports = function(req, res) {
  var user_id = req.params.user_id;

  if (user_id != undefined) {
    return loadUser(req, user_id)
      .then(function(user) {
        res.send({
          status: "success",
          user: user
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  } else if (req.isAuthenticated()) {
    user_id = req.user._id;
    return loadUser(req, user_id)
      .then(function(user) {
        res.send({
          status: "success",
          user: user
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  } else {
    res.send({
      status: "fail"
    });
  }
};
