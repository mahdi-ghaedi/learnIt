const userModel = require("../auth/user.model");
const userCourseModel = require("../userCourse/userCourse.model");

exports.changeRole = async (req, res) => {
  const newRole = "teacher";
  try {
    const targetUser = await userModel.findOneAndUpdate(
      { _id: req.params.id },
      { role: newRole }
    );
    res.json({ message: `${targetUser.fullname}s role changed to ${newRole}` });
  } catch {}
};
exports.getAllParti = async (req, res) => {
  console.log("object");
  try {
    const targetItems = await userCourseModel.find({}).lean();
    res.status(200).json(targetItems);
  } catch (error) {
    res.status(500).json({ message: "خطا در دریافت دوره‌ها", error });
  }
};
