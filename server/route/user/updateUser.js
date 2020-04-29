var validCheck = require("./validCheck");

module.exports = function(req, user_id, new_user) {
  return new Promise(function(resolve, reject) {
    var ApplyModel = req.app.get("database").ApplyModel;
    var PollModel = req.app.get("database").PollModel;
    var UserModel = req.app.get("database").UserModel;

    UserModel.findOne({
      _id: user_id
    })
      .then(async function(user) {
        var is_user_invalid = validCheck(user);

        if (is_user_invalid) {
          return resolve(is_user_invalid);
        }

        user.email = new_user.email;
        user.student_number = new_user.student_number;
        user.group = new_user.group;
        user.name = new_user.name;
        user.updated = new Date();

        user.save(function(error) {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      })
      .catch(function(error) {
        reject(error);
      });
  });
};
