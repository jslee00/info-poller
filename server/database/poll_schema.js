var crypto = require("crypto");

var Schema = {};

Schema.createSchema = function(mongoose) {
  var PollSchema = mongoose.Schema({
    startDateTime: { type: Date, required: true },
    endDateTime: { type: Date, required: true },
    writer: { type: Number, required: true, ref: "users" },
    title: { type: String, default: "" },
    intro: { type: String, default: "" },
    target: { type: Object, required: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
  });

  PollSchema.static("findAll", function(callback) {
    return this.find({}, callback);
  });

  return PollSchema;
};

module.exports = Schema;
