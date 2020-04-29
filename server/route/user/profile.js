module.exports = function(req, res) {
  if (req.isAuthenticated()) {
    res.send({
      status: "success",
      user: req.user
    });
  } else {
    res.send({
      status: "fail"
    });
  }
};
