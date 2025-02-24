const multer = require("multer");
const courseModel = require("../../modules/courses/courses.model");
const path = require("path");

exports.isExistCourse = async (req, res, next) => {
  try {
    //* بررسی مقدار req.body و title قبل از پردازش
    if (!req.body || !req.body.title) {
      return res.status(400).json({ message: "عنوان دوره وارد نشده است." });
    }

    //* بررسی وجود دوره با عنوان مشخص‌شده
    const existingCourse = await courseModel.findOne({ title: req.body.title });

    if (existingCourse) {
      return res.status(400).json({ message: "این دوره از قبل وجود دارد." });
    }

    next();
  } catch (error) {
    console.error("خطا در بررسی وجود دوره:", error);
    return res.status(500).json({ message: "خطای سرور", error });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqName = `${file.fieldname}-${Date.now()}`;

    const ext = path.extname(file.originalname);
    cb(null, `${uniqName}${ext}`);
  },
});
exports.upload = multer({ storage });
