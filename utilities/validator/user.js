const Schema = require("validate");

const signInValidation = new Schema({
  fullname: {
    type: String,
    required: true,
    message: {
      type: "نام باید یک رشته (متن) باشد.",
      required: "وارد کردن نام الزامی است.",
    },
  },
  phone: {
    type: String,
    required: true,
    message: {
      type: "شماره تلفن باید یک رشته (متن) باشد.",
      required: "وارد کردن شماره تلفن الزامی است.",
    },
  },
  email: {
    type: String,
    required: true,
    match: /^\S+@\S+\.\S+$/, // الگوی اعتبارسنجی ایمیل

    message: {
      type: "ایمیل باید یک رشته (متن) باشد.",
      required: "وارد کردن ایمیل الزامی است.",
      match: "لطفاً ایمیل معتبر وارد کنید.",
    },
  },
  age: {
    type: Number,
    required: true,
    message: {
      type: "سن باید یک عدد باشد.",
      required: "وارد کردن سن الزامی است.",
      min: "سن باید حداقل 18 باشد  .",
    },
  },
  password: {
    type: String,
    required: true,
    message: {
      type: "رمز عبور باید یک رشته (متن) باشد.",
      required: "وارد کردن رمز عبور الزامی است.",
    },
  },
  role: {
    type: String,
    required: false,
    enum: ["teacher"],
    message: {
      type: "نقش باید یک رشته (متن) باشد.",
      enum: "مقدار وارد شده برای نقش معتبر نیست.",
    },
  },
});

const loginValidation = new Schema({
  userInput: {
    type: String,
    required: true,
    message: {
      type: "ایمیل یا شماره تلفن باید یک رشته (متن) باشد.",
      required: "وارد کردن ایمیل یا شماره تلفن الزامی است.",
    },
  },
  password: {
    type: String,
    required: true,
    message: {
      type: "رمز عبور باید یک رشته (متن) باشد.",
      required: "وارد کردن رمز عبور الزامی است.",
    },
  },
});

module.exports = { signInValidation, loginValidation };
