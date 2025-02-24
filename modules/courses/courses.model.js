// const = require("mongoose");

const { default: mongoose } = require("mongoose");

const schema = mongoose.Schema(
  {
    title: {},
    desc: {},
    shortDesc: {},
    teacher: {
      type: mongoose.Types.ObjectId,
      ref: "USER",
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "CATEGORY",
    },
    level: {},
    language: {},
    price: {},
    cover: {},
    video: {},
    status: {},
    free: {},
  },
  { timestamps: true }
);
const courseModel = mongoose.model("COURSE", schema);
schema.virtual("session", {
  ref: "SESSION",
  localField: "_id",
  foreignField: "course",
  justOne: true,
});
schema.virtual("comments", {
  ref: "comments",
  localField: "_id",
  foreignField: "targetItem",
  justOne: true,
});
module.exports = courseModel;
