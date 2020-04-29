var LocalStrategy = require("passport-local").Strategy;

module.exports = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  },
  function(req, email, password, done) {
    console.log(
      "[ ] (passport) Passport local-signup called : " + email + ", " + password
    );
    var user;

    var name = req.body.name;
    var group = req.body.group;
    var student_number = req.body.student_number;
    var rank = req.body.rank;

    var UserModel = req.app.get("database").UserModel;

    UserModel.findOne({ email: email }, function(err, user) {
      if (err) {
        return done(err);
      }

      if (user) {
        console.log("[ ] Email [%s] duplicated", email);
        return done(null, false);
      } else {
        if (rank == "admin") {
          user = new UserModel({
            email,
            password,
            name,
            group,
            rank,
            enabled: false
          });
        } else {
          user = new UserModel({
            email,
            password,
            name,
            group,
            rank,
            student_number,
            enabled: true
          });
        }

        user.save(function(err) {
          if (err) {
            return done(err);
          }
          console.log("[ ] (passport) User inserted");
          done(null, user);
        });
      }
    });
  }
);
