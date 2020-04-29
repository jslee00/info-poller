var crypto = require("crypto");

var Schema = {};

Schema.createSchema = function(mongoose) {
  var ApplySchema = mongoose.Schema({
    poll: { type: Number, required: true, ref: "polls" },
    item: { type: Number, required: true, ref: "items" },
    user: { type: Number, required: true, ref: "users" },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
  });

  ApplySchema.static("findAll", function(callback) {
    return this.find({}, callback);
  });

  return ApplySchema;
};

module.exports = Schema;
