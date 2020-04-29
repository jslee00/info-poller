module.exports = function(req, user_id) {
  return new Promise(function(resolve, reject) {
    var ApplyModel = req.app.get("database").ApplyModel;
    var PollModel = req.app.get("database").PollModel;
    var ItemModel = req.app.get("database").ItemModel;
    var UserModel = req.app.get("database").UserModel;

    UserModel.findOne({
      _id: user_id
    })
      .then(async function(user) {
        var user = {
          ...user._doc
        };

        await PollModel.find({
          endDateTime: {
            $gt: new Date()
          }
        })
          .then(async function(polls) {
            user.waitingPollCount = polls.length;
            await polls.forEach(async function(poll, index, array) {
              await ApplyModel.count({
                poll: poll._id,
                user: user._id
              }).then(function(count) {
                if (count > 0) {
                  user.waitingPollCount--;
                }
              });
            });
          })
          .catch(function(error) {
            reject(error);
          });
        await ApplyModel.find({
          user: user_id
        })
          .distinct("poll")
          .then(function(applies) {
            user.appliedPollCount = applies.length;
          })
          .catch(function(error) {
            reject(error);
          });
        await PollModel.count({
          endDateTime: {
            $lte: new Date()
          }
        })
          .then(function(count) {
            user.completedPollCount = count;
          })
          .catch(function(error) {
            reject(error);
          });
        if (user.rank == "admin") {
          await PollModel.find({
            writer: user_id,
            endDateTime: {
              $gt: new Date()
            }
          })
            .count()
            .then(function(count) {
              user.myPollCount = count;
            })
            .catch(function(error) {
              reject(error);
            });
          await PollModel.find({
            writer: user_id,
            endDateTime: {
              $lte: new Date()
            }
          })
            .count()
            .then(function(count) {
              user.myCompletedPollCount = count;
            })
            .catch(function(error) {
              reject(error);
            });

          resolve(user);
        } else {
          resolve(user);
        }
      })
      .catch(function(error) {
        reject(error);
      });
  });
};
