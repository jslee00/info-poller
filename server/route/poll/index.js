var moment = require("moment");

var loadPoll = require("./loadPoll");

module.exports = {
  get: function(req, res) {
    var id = req.params.id;

    loadPoll(req, id).then(function(poll) {
      res.send({
        status: "success",
        poll: poll
      });
    });
  },
  add: function(req, res) {
    var PollModel = req.app.get("database").PollModel;

    var startDateTime = req.body.startDateTime;
    var endDateTime = req.body.endDateTime;
    var writer = req.user._id;
    var title = req.body.title;
    var intro = req.body.intro;
    var target = req.body.target;

    var poll = new PollModel({
      startDateTime,
      endDateTime,
      writer,
      title,
      intro,
      target
    });

    poll.save(function(err) {
      if (err) {
        console.dir(err);
        return res.send({
          status: "error"
        });
      }
      console.log("[ ] (poll) Poll inserted:", poll.title);
      return res.send({
        status: "success",
        id: poll._id
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
    var PollModel = req.app.get("database").PollModel;
    var ItemModel = req.app.get("database").ItemModel;

    try {
      var query = JSON.parse(req.query.query);
      if (req.query.applied) {
        var applied = JSON.parse(req.query.applied);
      }
    } catch (e) {
      console.log(
        "[!] JSON Parsing Exception occured : " + JSON.stringify(req.query)
      );
      return res.send({ status: "error" });
    }

    PollModel.find(query)
      .select("_id")
      .then(async function(polls) {
        var result = [];

        if (polls.length == 0) {
          res.send({
            status: "success",
            pollList: result
          });
          return;
        }

        var count = 0;
        await polls.forEach(async function(poll, index, array) {
          await loadPoll(req, poll._id, applied).then(function(poll) {
            if (poll) {
              result.push(poll);
            }
            count++;
            if (count == array.length) {
              res.send({
                status: "success",
                pollList: result
              });
            }
          });
        });
      })
      .catch(function(error) {
        console.log("[!] " + error.message);
        res.send({
          status: "fail"
        });
      });
  }
};
