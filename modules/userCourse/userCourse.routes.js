const express = require("express");

const {
  checkUser,
  accessToSetCourse,
  isAdmin,
} = require("../../utilities/middlewares/auth");
const {
  userNewCourse,
  getUserCourse,
  getAllItem,
} = require("./userCourse.controller");

const userCourseRouter = express.Router();

// دریافت تمام دوره‌های ثبت‌نامی (فقط برای ادمین)
// userCourseRouter.get("/", getAllItem);

// // ثبت نام در دوره
// userCourseRouter.post("/", checkUser, userNewCourse);

// // دریافت دوره ثبت‌نامی خاص یک کاربر
// userCourseRouter.get("/get/:id", checkUser, getUserCourse);

module.exports = userCourseRouter;
