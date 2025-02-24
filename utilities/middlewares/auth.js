const jwt = require("jsonwebtoken");
const userModel = require("../../modules/auth/user.model");

// بررسی وجود کاربر هنگام ثبت‌نام
exports.isExist = async (req, res, next) => {
  try {
    const targetUser = await userModel.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
    });

    if (targetUser) {
      return res
        .status(400)
        .json({ message: "این کاربر قبلاً ثبت‌نام کرده است." });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "خطای سرور" });
  }
};

// بررسی احراز هویت کاربر
exports.checkUser = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "توکن احراز هویت ارسال نشده است." });
    }

    const token = authHeader.split(" ")[1];

    const jwtPayload = jwt.verify(token, process.env.secretKey); // مقدار درست!

    const user = await userModel.findById(jwtPayload.id).lean();

    if (!user) {
      return res.status(404).json({ message: "کاربر یافت نشد." });
    }

    req.userInfo = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "احراز هویت نامعتبر است.", error });
  }
};

// بررسی نقش ادمین
exports.isAdmin = async (req, res, next) => {
  if (!req.userInfo || req.userInfo.role !== "ADMIN") {
    return res
      .status(403)
      .json({ message: "شما مجاز به دسترسی به این API نیستید." });
  }
  next();
};

// بررسی دسترسی برای ایجاد دوره
exports.accessToSetCourse = async (req, res, next) => {
  if (!req.userInfo || !["ADMIN", "teacher"].includes(req.userInfo.role)) {
    return res
      .status(403)
      .json({ message: "شما مجاز به انجام این عملیات نیستید." });
  }
  next();
};
