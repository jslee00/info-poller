var local_login = require("./local_login");
var local_signup = require("./local_signup");

module.exports = function(app, passport) {
  console.log("[ ] Passport setting called");

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    var UserModel = app.get("database")["UserModel"];
    UserModel.findById(id, function(err, users) {
      if (err) {
        done(err);
      }
      if ((users.length = 1)) {
        if (users[0].enabled) {
          done(null, users[0]);
        } else {
          done(null, false);
        }
      } else {
        done(null, false);
      }
    });
  });

  passport.use("local-login", local_login);
  passport.use("local-signup", local_signup);

  console.log("[+] Passport setting complete");
};
