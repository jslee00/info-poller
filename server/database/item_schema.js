var crypto = require("crypto");

var Schema = {};

Schema.createSchema = function(mongoose) {
  var ItemSchema = mongoose.Schema({
    poll: { type: Number, required: true, ref: "polls" },
    writer: { type: Number, required: true, ref: "users" },
    leader: { type: String, default: "" },
    image: { type: String, default: "" },
    title: { type: String, default: "" },
    intro: { type: String, default: "" },
    description: { type: String, default: "" },
    maxApply: { type: Number, required: true },
    week: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
  });

  ItemSchema.static("findAll", function(callback) {
    return this.find({}, callback);
  });

  return ItemSchema;
};

module.exports = Schema;
