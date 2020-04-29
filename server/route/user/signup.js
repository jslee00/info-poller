var passport = require("passport");

var logined = require("./logined");
var validCheck = require("./validCheck");

module.exports = function(req, res, next) {
  var is_user_invalid = validCheck({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    group: req.body.group
  });

  if (is_user_invalid) {
    return res.send(is_user_invalid);
  }

  console.log("signup : " + req.body.email + ", " + req.body.password);
  passport.authenticate("local-signup", function(err, user, info) {
    if (err) {
      res.send({
        status: "error",
        flash: "오류가 발생했습니다."
      });
      console.dir(err);
      return next(err);
    }
    if (!user) {
      return res.send({
        status: "fail",
        flash: "이미 사용중인 이메일입니다."
      });
    }
    if (!user.enabled) {
      console.log("[ ] (user) Admin user sign up success");
      return res.send({
        status: "disabled",
        flash:
          "가입 신청이 완료되었습니다. 관리자의 계정 활성화 후 사용 가능합니다."
      });
    }
    req.login(user, function(err) {
      if (err) {
        res.send({
          status: "error",
          flash: "오류가 발생했습니다."
        });
        console.dir(err);
        return next(err);
      }
      console.log("[ ] (user) Sign up success");
      return logined(req, res);
    });
  })(req, res, next);
};
