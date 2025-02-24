const { text } = require("express");
const { default: mongoose } = require("mongoose");

const schema = mongoose.Schema(
  {
    author: {},
    targetItem: {
      type: mongoose.Types.ObjectId,
      default: null,
      ref: function () {
        return this.verifiedBuyer ? "COURSE" : "SESSION"; // 'this' refers to the document being populated
      },
    },
    text: {},

    parent: {
      type: mongoose.Types.ObjectId,
      ref: "COMMENT",
      default: null,
    },
    replies: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
const commentModel = mongoose.model("COMMENT", schema);
module.exports = commentModel;
