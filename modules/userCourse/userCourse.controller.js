const userCourseModel = require("./userCourse.model");

const canRegister = true;

// ثبت نام کاربر در دوره
exports.userNewCourse = async (req, res) => {
  const { courseId } = req.body;

  if (canRegister) {
    try {
      // ایجاد رکورد ثبت نام در دوره
      await userCourseModel.create({
        user: req.userInfo._id,
        course: courseId,
      });

      res
        .status(201)
        .json({ message: "ثبت نام در این دوره با موفقیت انجام شد" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "خطا در ثبت نام، لطفاً دوباره تلاش کنید", error });
    }
  } else {
    res.status(400).json({ message: "امکان ثبت نام در این دوره وجود ندارد" });
  }
};

// دریافت دوره‌های ثبت‌نامی کاربر
exports.getUserCourse = async (req, res) => {
  const id = req.params.id;

  try {
    const targetCourse = await userCourseModel.findOne({
      $and: [{ user: req.userInfo._id }, { course: id }],
    });

    if (!targetCourse) {
      return res.status(404).json({ message: "دوره‌ای یافت نشد" });
    }

    res.status(202).json(targetCourse);
  } catch (error) {
    res.status(500).json({ message: "خطا در دریافت دوره‌ها", error });
  }
};

// دریافت تمام دوره‌های ثبت‌نامی
// exports.getAllItem = async (req, res) => {
//   console.log("object");
//   try {
//     const targetItems = await userCourseModel.find({}).lean();
//     res.status(200).json(targetItems);
//   } catch (error) {
//     res.status(500).json({ message: "خطا در دریافت دوره‌ها", error });
//   }
// };
