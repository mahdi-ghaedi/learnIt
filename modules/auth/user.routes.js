const express = require("express");
const {
  userSignIn,
  userLogin,
  getUser,
  getTeachers,
  getAllUsers,
  editProfile,
} = require("./user.controller");
const { isExist, checkUser } = require("../../utilities/middlewares/auth");
const { upload } = require("../../utilities/middlewares/course");

const userRouter = express.Router();

// تعریف مسیرها به‌صورت آرایه‌ای برای خوانایی و مدیریت بهتر
const routes = [
  { method: "post", path: "/signin", handlers: [isExist, userSignIn] },
  { method: "post", path: "/login", handlers: [userLogin] },
  { method: "get", path: "/", handlers: [checkUser, getUser] },
  { method: "get", path: "/teacher", handlers: [getTeachers] },
  { method: "get", path: "/allUser", handlers: [getAllUsers] },
  {
    method: "put",
    path: "/edit",
    handlers: [checkUser, upload.single("profilePic"), editProfile],
  },
];

// ثبت مسیرها در `userRouter`
routes.forEach(({ method, path, handlers }) => {
  userRouter[method](path, ...handlers);
});

module.exports = userRouter;
