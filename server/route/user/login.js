var passport = require("passport");

var logined = require("./logined");

module.exports = function(req, res, next) {
  console.log(
    "[ ] (user) login : " + req.body.email + ", " + req.body.password
  );
  passport.authenticate("local-login", function(err, user, info) {
    if (err) {
      return res.send({
        status: "error",
        flash: "오류가 발생했습니다."
      });
      return next(err);
    }
    if (!user) {
      return res.send({
        status: "fail",
        flash: "이메일 또는 비밀번호가 잘못되었습니다."
      });
    }
    if (!user.enabled) {
      console.log("[ ] (user) Disabled user login rejected");
      return res.send({
        status: "disabled",
        flash: "비활성 계정입니다. 관리자에게 문의하세요."
      });
    }
    req.login(user, function(err) {
      if (err) {
        res.send({
          status: "error",
          flash: "오류가 발생했습니다."
        });
        return next(err);
      }
      console.log("[ ] (user) Login success");
      return logined(req, res);
    });
  })(req, res, next);
};
