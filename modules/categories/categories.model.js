// const = require("mongoose");

const { default: mongoose } = require("mongoose");

const schema = mongoose.Schema(
  {
    title_fa: {},
    title_en: {},
  },
  { timestamps: true }
);
const categoryModel = mongoose.model("CATEGORY", schema);

module.exports = categoryModel;
