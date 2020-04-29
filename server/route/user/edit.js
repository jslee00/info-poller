var updateUser = require("./updateUser");

module.exports = function(req, res) {
  var user_id = req.params.user_id;
  var user = req.body;

  if (user_id != undefined) {
    return updateUser(req, user_id, user)
      .then(function(invalid) {
        if (invalid) {
          res.send(invalid);
        } else {
          res.send({
            status: "success"
          });
        }
      })
      .catch(function(error) {
        console.log(error);
        res.send({
          status: "error"
        });
      });
  } else {
    res.send({
      status: "fail"
    });
  }
};
