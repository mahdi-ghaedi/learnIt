const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userModel = require("./user.model");
const {
  signInValidation,
  loginValidation,
} = require("../../utilities/validator/user");

const saltRounds = 10;
const secretKey = process.env.secretKey;

// ثبت‌نام کاربر جدید
exports.userSignIn = async (req, res) => {
  try {
    const { fullname, phone, email, age, password, role } = req.body;

    // اعتبارسنجی ورودی‌ها
    const error = signInValidation.validate(req.body);
    if (error.length) {
      return res.status(400).json({ message: error[0].message });
    }

    // هش کردن رمز عبور
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // تعیین نقش کاربر (اولین کاربر: مدیر، بقیه: کاربر عادی)
    const countUser = await userModel.countDocuments();
    const userRole = role ? role : countUser === 0 ? "ADMIN" : "user";

    // ایجاد کاربر جدید
    const newUser = await userModel.create({
      fullname,
      phone,
      email,
      age,
      password: hashedPassword,
      role: userRole,
    });

    // ایجاد توکن
    const token = jwt.sign({ id: newUser._id }, secretKey);

    return res.status(201).json({
      message: `کاربر جدید (${newUser.fullname}) با موفقیت ثبت شد.`,
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "خطای سرور", error: err });
  }
};

// ورود کاربر
exports.userLogin = async (req, res) => {
  try {
    const { userInput, password } = req.body;

    // اعتبارسنجی ورودی‌ها
    const result = loginValidation.validate(req.body);

    if (result.length) {
      return res.status(400).json({ message: result[0].message });
    }

    // جستجوی کاربر در دیتابیس
    const targetUser = await userModel.findOne({
      $or: [{ phone: userInput }, { email: userInput }],
    });

    if (!targetUser) {
      return res.status(404).json({ message: "کاربر یافت نشد" });
    }

    // بررسی رمز عبور
    const isPasswordCorrect = await bcrypt.compare(
      password,
      targetUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "رمز عبور اشتباه است" });
    }

    // ایجاد توکن و ارسال پاسخ
    const token = jwt.sign({ id: targetUser._id }, secretKey);
    return res.status(200).json({
      message: `خوش آمدید ${targetUser.fullname}`,
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "خطای سرور" });
  }
};

// دریافت اطلاعات کاربر از طریق توکن
exports.getUser = async (req, res) => {
  const authHeader = req.header("Authorization")?.split(" ")[1];

  if (!authHeader) {
    return res.status(401).json({ message: "توکن یافت نشد" });
  }

  try {
    const { id } = jwt.verify(authHeader, secretKey);
    const user = await userModel
      .findById(id)
      .select("fullname role email phone profilePic")
      .lean();

    if (!user) {
      return res.status(404).json({ message: "کاربر یافت نشد" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(401).json({ message: "توکن نامعتبر است" });
  }
};

// دریافت لیست معلمان و مدیران
exports.getTeachers = async (req, res) => {
  try {
    const teachers = await userModel.find({
      role: { $in: ["teacher", "ADMIN"] },
    });
    return res.status(200).json(teachers);
  } catch (error) {
    return res.status(500).json({ message: "خطای سرور" });
  }
};

// دریافت همه کاربران
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({}).lean();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "خطای سرور" });
  }
};
// !1111111111111111111111111
exports.editProfile = async (req, res) => {
  const id = req.userInfo._id;
  const { fullname, profilePic } = req.body;
  const fileName = req.file ? req.file.filename : null; // دسترسی به نام فایل ذخیره شده

  const targetUser = await userModel.findOneAndUpdate(
    { _id: id }, // استفاده از _id برای جستجو
    { fullname, profilePic: fileName } // مقادیر جدید برای آپدیت
  );

  if (!targetUser) {
    return res.status(404).send({ message: "کاربر پیدا نشد" });
  }

  res.status(201).send({ message: "ویرایش با موفقیت انجام شد" });
};
