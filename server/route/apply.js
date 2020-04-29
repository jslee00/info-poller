module.exports = {
  get: function(req, res) {
    var PollModel = req.app.get("database").PollModel;

    var id = req.params.id;

    PollModel.aggregate([
      { $match: { _id: Number.parseInt(id) } },
      {
        $lookup: {
          from: "users",
          localField: "writer",
          foreignField: "_id",
          as: "writer"
        }
      },
      {
        $lookup: {
          from: "apply",
          localField: "writer",
          foreignField: "_id",
          as: "writer3"
        }
      }
    ]).exec(function(err, poll) {
      if (err) {
        console.dir(err);
        return res.send({ status: "error" });
      }
      poll = poll;
      return res.send({ status: "success", poll: poll });
    });
  },
  apply: async function(req, res) {
    var ApplyModel = req.app.get("database").ApplyModel;
    var ItemModel = req.app.get("database").ItemModel;
    var UserModel = req.app.get("database").UserModel;

    var item_id = req.params.item_id;
    var poll_id;
    var user_id = req.user._id;

    await ItemModel.findOne({ _id: item_id }).then(function(item) {
      poll_id = item.poll;
    });

    await ApplyModel.count({
      item: item_id,
      poll: poll_id,
      user: user_id
    }).then(async function(count) {
      if (count >= 1) {
        res.send({
          status: "already"
        });
      } else {
        await ItemModel.findOne({
          _id: item_id
        }).then(async function(item) {
          await ApplyModel.count({
            item: item._id
          }).then(async function(count) {
            if (count >= item.maxApply) {
              res.send({
                status: "max"
              });
            } else {
              await ApplyModel.find({
                user: user_id
              }).then(async function(applies) {
                // if (applies.length == 0) {
                var apply = new ApplyModel({
                  item: item_id,
                  poll: poll_id,
                  user: user_id
                });

                apply.save(async function(error) {
                  if (error) {
                    console.dir(error);
                    try {
                      res.send({
                        status: "error"
                      });
                      return;
                    } catch (error) {
                      return;
                    }
                  }
                  try {
                    res.send({
                      status: "success"
                    });
                    return;
                  } catch (error) {
                    return;
                  }
                });
                // } else {
                //   applies.forEach(async function(apply, index, array) {
                //     await ItemModel.findOne({
                //       _id: apply.item
                //     }).then(function(another_item) {
                //       if (
                //         !duplicated &&
                //         array_diff(item.tags, another_item.tags).length == 0
                //       ) {
                //         duplicated = true;
                //         return res.send({
                //           status: "duplicated"
                //         });
                //       }
                //       if (index == array.length - 1) {
                //         var apply = new ApplyModel({
                //           item: item_id,
                //           user: user_id
                //         });

                //         if (!duplicated) {
                //           apply.save(function(error) {
                //             if (error) {
                //               console.dir(error);
                //               res.send({
                //                 status: "error"
                //               });
                //             }
                //             res.send({
                //               status: "success"
                //             });
                //           });
                //         }
                //       }
                //     });
                //   });
                // }
              });
            }
          });
        });
      }
    });
  },
  delete: function(req, res) {
    var ApplyModel = req.app.get("database").ApplyModel;

    var item_id = req.params.item_id;
    var user_id = req.user._id;

    ApplyModel.remove({ user: user_id, item: item_id }, function(error) {
      if (error) {
        console.log(error);
      }

      res.send({ status: "success" });
    });
  }
};
