var moment = require("moment");

module.exports = function(req, poll_id, applied) {
  return new Promise(async function(resolve, reject) {
    var ApplyModel = req.app.get("database").ApplyModel;
    var PollModel = req.app.get("database").PollModel;
    var ItemModel = req.app.get("database").ItemModel;

    var user_id = req.user._id;

    await ItemModel.find({ poll: poll_id }).then(async function(items) {
      if (applied != undefined && (applied && items.length == 0)) {
        return resolve(false);
      }

      var count = 0;
      var loopCount = 0;
      await items.forEach(async function(item, index, array) {
        await ApplyModel.count({ user: user_id, item: item._id }).then(function(
          c
        ) {
          count += c;
          loopCount++;
          if (loopCount == array.length) {
            if (
              applied != undefined &&
              ((applied && count == 0) || (!applied && count != 0))
            ) {
              resolve(false);
            }
          }
        });
      });
    });

    await PollModel.findOne({
      _id: Number.parseInt(poll_id)
    })
      .populate("writer")
      .then(async function(poll) {
        poll = { ...poll._doc };

        poll.startDate = moment(poll.startDateTime).format("YYYY-MM-DD");
        poll.startTime = moment(poll.startDateTime).format("HH:mm:ss");
        poll.endDate = moment(poll.endDateTime).format("YYYY-MM-DD");
        poll.endTime = moment(poll.endDateTime).format("HH:mm:ss");
        poll.writer = {
          _id: poll.writer._id,
          name: poll.writer.name
        };

        await ItemModel.count({ poll: poll_id }).then(function(count) {
          poll.itemCount = count;
        });

        await ItemModel.find({ poll: poll_id }).then(async function(items) {
          if (items.length == 0) {
            poll.currentApply = 0;
            resolve(poll);
          } else {
            count = 0;
            await items.forEach(async function(item, index, array) {
              await ApplyModel.find({ item: item._id })
                .distinct("user")
                .count()
                .then(async function(c) {
                  count += c;
                  if (index == array.length - 1) {
                    setTimeout(function() {
                      poll.currentApply = count;
                      resolve(poll);
                    }, 25);
                  }
                });
            });
          }
        });
      })
      .catch(function(error) {
        reject(error);
      });
  });
};
