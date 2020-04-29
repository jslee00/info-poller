function array_diff(a, b) {
  if (a.length > b.length) {
    var temp = a;
    a = b;
    b = temp;
  }
  var tmp = {};
  var res = [];
  for (var i = 0; i < a.length; i++) tmp[a[i]] = 1;
  for (var i = 0; i < b.length; i++) {
    if (tmp[b[i]]) delete tmp[b[i]];
  }
  for (var k in tmp) res.push(k);
  return res;
}

module.exports = {
  get: function(req, res) {
    var ApplyModel = req.app.get("database").ApplyModel;
    var ItemModel = req.app.get("database").ItemModel;

    var id = req.params.id;
    var user_id = req.user._id;

    ItemModel.aggregate([
      {
        $match: {
          _id: Number.parseInt(id)
        }
      },
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
          from: "applies",
          localField: "_id",
          foreignField: "item",
          as: "currentApply"
        }
      }
    ]).then(async function(items) {
      var item = items[0];
      item.writer = {
        _id: item.writer[0]._id,
        name: item.writer[0].name
      };
      item.currentApply = item.currentApply.length;

      if (user_id != undefined) {
        await ApplyModel.count({
          item: item._id,
          user: user_id
        }).then(function(count) {
          if (count > 0) {
            item.applied = true;
          }
        });
      }

      return res.send({
        status: "success",
        item: item
      });
    });
  },
  add: function(req, res) {
    var ItemModel = req.app.get("database").ItemModel;

    var poll = req.body.poll;
    var title = req.body.title;
    var intro = req.body.intro;
    var week = req.body.week;
    var leader = req.body.leader;
    var description = req.body.description;
    var maxApply = req.body.maxApply;
    var tags = req.body.tags;

    console.log(poll, title, intro, week, leader, description, maxApply, tags);

    if (maxApply <= 0) {
      res.send({
        status: "fail",
        flash: "선착순 인원은 0보다 작거나 같을 수 없습니다."
      });
      return;
    }

    var writer = req.user._id;

    var item = new ItemModel({
      poll,
      writer,
      leader,
      title,
      intro,
      description,
      maxApply,
      tags,
      week
    });

    item.save(function(err) {
      if (err) {
        console.dir(err);
        return res.send({
          status: "error"
        });
      }
      console.log("[ ] (item) Item inserted:", item.title);
      return res.send({
        status: "success",
        id: item._id
      });
    });
  },
  edit: function(req, res) {
    var PollModel = req.app.get("database").PollModel;

    var startDateTime = req.body.startDateTime;
    var endDateTime = req.body.endDateTime;
    var writer = req.body.writer;
    var title = req.body.title;
    var intro = req.body.intro;
    var target = req.body.target;
  },
  delete: function(req, res) {
    var PollModel = req.app.get("database").PollModel;

    var startDateTime = req.body.startDateTime;
    var endDateTime = req.body.endDateTime;
    var writer = req.body.writer;
    var title = req.body.title;
    var intro = req.body.intro;
    var target = req.body.target;
  },
  list: function(req, res) {
    var ApplyModel = req.app.get("database").ApplyModel;
    var ItemModel = req.app.get("database").ItemModel;

    var poll_id = req.query.poll_id;
    var user_id = req.user._id;

    ItemModel.find({
      poll: poll_id
    })
      .sort({
        created: "desc"
      })
      .then(function(items) {
        for (var i = 0; i < items.length; i++) {
          items[i] = {
            ...items[i]._doc
          };
        }
        if (items.length == 0) {
          res.send({ status: "success", itemList: items });
          return;
        }
        items.forEach(async function(item, index, array) {
          if (user_id != undefined) {
            await ApplyModel.count({
              item: item._id,
              user: user_id
            }).then(function(count) {
              if (count > 0) {
                item.applied = true;
              }
            });
          }
          await ApplyModel.find({
            item: item._id
          }).then(function(applies) {
            item.currentApply = applies.length;

            if (index == array.length - 1) {
              setTimeout(function() {
                res.send({
                  status: "success",
                  itemList: items
                });
                return;
              }, 25);
            }
          });
        });
      });

    // [
    //   {
    //     id: 1,
    //     poll: 1,
    //     title: "미적분 I",
    //     image:
    //       "https://www.rd.com/wp-content/uploads/2017/09/01-Can-You-Pass-This-Elementary-School-Math-Test--760x506.jpg",
    //     week: ["월"],
    //     writer: "홍길동 선생님",
    //     leader: "홍길동 선생님",
    //     intro: "강의 간단 소개",
    //     description: `
    //     <p>강의 설명이 너무 길어</p>
    //   `,
    //     currentApply: 15,
    //     maxApply: 20,
    //     tags: ["월요일"]
    //   },
    //   {
    //     id: 2,
    //     poll: 1,
    //     title: "미적분 II",
    //     image:
    //       "https://www.rd.com/wp-content/uploads/2017/09/01-Can-You-Pass-This-Elementary-School-Math-Test--760x506.jpg",
    //     week: ["월"],
    //     writer: "홍길동 선생님",
    //     leader: "홍길동 선생님",
    //     intro: "강의 간단 소개",
    //     description: `
    //     <p>강의 설명이 너무 길어</p>
    //   `,
    //     currentApply: 5,
    //     maxApply: 10,
    //     tags: ["월요일"]
    //   }
    // ]
  }
};
