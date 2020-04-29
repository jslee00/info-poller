var LocalStrategy = require("passport-local").Strategy;
module.exports = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  },
  function(req, email, password, done) {
    console.log(
      "[ ] (local_login) Passport local-login called : " +
        email +
        ", " +
        password
    );

    var UserModel = req.app.get("database").UserModel;
    UserModel.findOne(
      {
        email: email
      },
      function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          console.log("[ ] (local_login) User not matched");
          return done(null, false);
        }
        if (!user.authenticate(password, user.salt, user.hashed_password)) {
          console.log("[ ] (local_login) User password is wrong");
          return done(null, false);
        }
        console.log("[ ] (local_login) Authentication success");
        return done(null, user);
      }
    );
  }
);
