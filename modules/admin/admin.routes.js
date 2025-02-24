const express = require("express");
const { checkUser, isAdmin } = require("../../utilities/middlewares/auth");
const { changeRole, getAllParti } = require("./admin.controller");
const userModel = require("../auth/user.model");

const adminRouter = express.Router();

// دریافت تمام کاربران
adminRouter.get("/", async (req, res) => {
  try {
    const users = await userModel.find({}).lean();
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "مشکلی در دریافت کاربران پیش آمده", error });
  }
});

// تغییر نقش کاربر
adminRouter.put("/changeRole/:id", checkUser, isAdmin, async (req, res) => {
  const userId = req.params.id;
  const { role } = req.body;

  if (!role || !["user", "admin", "teacher"].includes(role)) {
    return res.status(400).json({ message: "نقش معتبر را وارد کنید" });
  }

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { role },
      { new: true, runValidators: true } // برگشت به نسخه جدید کاربر پس از تغییر و اطمینان از اعتبارسنجی
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "کاربر یافت نشد" });
    }

    return res.status(200).json({
      message: `نقش کاربر به ${role} تغییر یافت`,
      user: updatedUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "مشکلی در تغییر نقش پیش آمده", error });
  }
});
adminRouter.get("/participants", checkUser, isAdmin, getAllParti);

module.exports = adminRouter;
