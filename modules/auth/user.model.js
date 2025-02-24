const { default: mongoose } = require("mongoose");

const schema = mongoose.Schema(
  {
    fullname: {},
    phone: {},
    email: {},
    age: {},
    profilePic: {},
    password: {},
    role: {},
  },
  { timestamps: true }
);

const userModel = mongoose.model("USER", schema);
module.exports = userModel;
