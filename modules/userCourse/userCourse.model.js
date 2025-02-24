const { default: mongoose } = require("mongoose");

const schema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "USER",
  },
  course: {
    type: mongoose.Types.ObjectId,
    ref: "COURSE",
  },
});

const userCourseModel = mongoose.model("USERCOURSE", schema);
module.exports = userCourseModel;
