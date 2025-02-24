const { default: mongoose } = require("mongoose");

const schema = mongoose.Schema(
  {
    course: {
      type: mongoose.Types.ObjectId,
      ref: "COURSE",
    },
    title: {},
    desc: {},
    video: {},
    free: {},
    time: {},
  },
  { timestamps: true }
);
const sessionModel = mongoose.model("SESSION", schema);
schema.virtual("comments", {
  ref: "comments",
  localField: "_id",
  foreignField: "session",
  justOne: true,
});

module.exports = sessionModel;
