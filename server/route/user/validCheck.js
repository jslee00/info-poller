module.exports = function(user) {
  if (
    user.email.length <= 2 ||
    user.email.indexOf("@") == -1 ||
    user.email.indexOf(".") == -1
  ) {
    return {
      status: "fail",
      flash: "올바른 이메일 주소를 기입해 주십시오."
    };
  }
  if (user.password.length < 8) {
    return {
      status: "fail",
      flash: "비밀번호는 8자리 이상이어야 합니다."
    };
  }
  if (user.name.length == 0) {
    return {
      status: "fail",
      flash: "이름을 입력해 주십시오."
    };
  }
  if (user.group[0].length == 0) {
    return {
      status: "fail",
      flash: "소속을 입력해 주십시오."
    };
  }
  return false;
};
