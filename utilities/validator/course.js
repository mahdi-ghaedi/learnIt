const Schema = require("validate");

const setCourseInValidation = new Schema({
  title: {
    type: String,
    required: true,
    message: {
      type: "عنوان باید یک رشته (متن) باشد.",
      required: "وارد کردن عنوان الزامی است.",
    },
  },
  desc: {
    type: String,
    required: true,
    message: {
      type: "توضیحات باید یک رشته (متن) باشد.",
      required: "وارد کردن توضیحات الزامی است.",
    },
  },
  shortDesc: {
    type: String,
    required: true,
    message: {
      type: "توضیح کوتاه باید یک رشته (متن) باشد.",
      required: "وارد کردن توضیح کوتاه الزامی است.",
    },
  },
  category: {
    type: String,
    required: true,
    message: {
      type: "دسته‌بندی باید یک رشته (متن) باشد.",
      required: "انتخاب دسته‌بندی الزامی است.",
    },
  },
  level: {
    type: String,
    required: true,
    message: {
      type: "سطح دوره باید یک رشته (متن) باشد.",
      required: "انتخاب سطح دوره الزامی است.",
    },
  },
  language: {
    type: String,
    required: true,
    message: {
      type: "زبان دوره باید یک رشته (متن) باشد.",
      required: "انتخاب زبان دوره الزامی است.",
    },
  },
  price: {
    type: String, // ✅ اصلاح شد
    required: true,
    message: {
      type: "قیمت باید یک عدد باشد.",
      required: "وارد کردن قیمت الزامی است.",
    },
  },

  video: {
    type: String,
    required: true,
    message: {
      type: "آدرس ویدیو باید یک رشته (متن) باشد.",
      required: "وارد کردن ویدیو الزامی است.",
    },
  },
  free: {
    type: String,
    required: true,
    message: {
      type: "رایگان بودن باید مقدار صحیح (true یا false) داشته باشد.",
      required: "مشخص کردن رایگان بودن دوره الزامی است.",
    },
  },
});

module.exports = { setCourseInValidation };
