const express = require("express");
const { isExistCourse, upload } = require("../../utilities/middlewares/course");
const {
  checkUser,
  accessToSetCourse,
} = require("../../utilities/middlewares/auth");
const {
  setCourse,
  getCourse,
  editCourse,
  deleteOne,
  getCourseByCat,
} = require("./courses.controller");

const courseRouter = express.Router();

// روت برای ایجاد دوره جدید
courseRouter.post(
  "/new",
  checkUser, // بررسی ورود کاربر
  accessToSetCourse, // بررسی دسترسی کاربر برای ایجاد دوره
  upload.single("cover"),
  isExistCourse, // بررسی وجود دوره با عنوان مشابه
  setCourse // ایجاد دوره جدید
);

// روت برای دریافت دوره بر اساس شناسه یا دریافت همه دوره‌ها
courseRouter.get("/:id?", getCourse);

// روت برای دریافت دوره بر اساس دست بندی
courseRouter.get("/cat/:category", getCourseByCat);

// روت برای ویرایش دوره
courseRouter.put("/:id?", checkUser, accessToSetCourse, editCourse);

// روت برای حذف دوره
courseRouter.delete("/:id?", checkUser, accessToSetCourse, deleteOne);

module.exports = courseRouter;
