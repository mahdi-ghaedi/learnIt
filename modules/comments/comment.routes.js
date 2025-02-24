const express = require("express");
const { checkUser, isAdmin } = require("../../utilities/middlewares/auth");
const { newComment } = require("./comment.controller");

const commentRouter = express.Router();

// ارسال کامنت یا پاسخ به کامنت موجود
commentRouter.post("/:targetId/:commentId?", checkUser, newComment);

module.exports = commentRouter;
