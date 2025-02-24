const { setCourseInValidation } = require("../../utilities/validator/course");
const commentModel = require("../comments/comments.model");
const sessionModel = require("../sessions/sessions.model");
const userCourseModel = require("../userCourse/userCourse.model");
const courseModel = require("./courses.model");

exports.setCourse = async (req, res) => {
  try {
    const {
      title,
      desc,
      shortDesc,
      category,
      level,
      language,
      price,

      video,
      status,
      free,
    } = req.body;
    const result = setCourseInValidation.validate(req.body);
    if (result.length) {
      const errObj = {};
      errObj[result[0]?.path] = result[0]?.message;
      return res.status(400).json(errObj); // ارسال پیام خطا با وضعیت 400
    }

    const newCourse = await courseModel.create({
      title,
      desc,
      shortDesc,
      teacher: req.userInfo._id,
      category,
      level,
      language,
      price,
      cover: req.file.filename,
      video,
      status: 0,
      free,
    });

    const targetCourse = await courseModel
      .findOne({ title })
      .populate("teacher", "fullname")
      .populate("category", "title_fa")
      .lean();

    return res.status(201).json(targetCourse); // ارسال پاسخ با وضعیت 201 برای موفقیت‌آمیز بودن ایجاد
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "خطای داخلی سرور" });
  }
};

exports.getCourse = async (req, res) => {
  try {
    if (req.params.id) {
      const course = await courseModel
        .findOne({ _id: req.params.id })
        .select("-__v ")
        .populate("teacher", "fullname -_id")
        .populate("category", "title_fa -_id")
        .lean();

      if (!course) {
        return res.status(404).json({ message: "دوره پیدا نشد" });
      }

      const sessions = await sessionModel
        .find({ course: course._id })
        .select("-__v -_id ")
        .lean();

      const comments = await commentModel
        .find({ targetItem: course._id })
        .select("author text replies _id")
        .lean();

      const countOfMember = await userCourseModel.find({ course: course._id });

      return res.json([
        course,
        sessions,
        comments,
        { counter: countOfMember.length },
      ]);
    }

    const courses = await courseModel
      .find({})
      .select("-__v ")
      .populate("teacher", "fullname -_id")
      .populate("category", "title_fa -_id")
      .lean();

    return res.json(courses);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "خطای داخلی سرور" });
  }
};

exports.getCourseByCat = async (req, res) => {
  try {
    const { category } = req.params;

    const targetCourses = await courseModel.find({ category }).lean();

    return res.json(targetCourses);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "خطای داخلی سرور" });
  }
};

exports.editCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, desc, teacher, category, free } = req.body;
    const result = setCourseInValidation.validate(req.body);

    if (result.length) {
      const errObj = {};
      errObj[result[0]?.path] = result[0]?.message;
      return res.status(400).json(errObj); // ارسال پیام خطا با وضعیت 400
    }

    const targetCourse = await courseModel.findById(id);
    if (!targetCourse) {
      return res.status(404).json({ message: "دوره پیدا نشد" });
    }

    await courseModel.findOneAndUpdate(
      { _id: id },
      { title, desc, teacher, category, free }
    );

    return res.json({ message: `دوره ${title} با موفقیت ویرایش شد` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "خطای داخلی سرور" });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const id = req.params.id;
    const targetCourse = await courseModel.findById(id);
    if (!targetCourse) {
      return res.status(404).json({ message: "دوره پیدا نشد" });
    }

    await courseModel.findOneAndDelete({ _id: id });

    return res.json({ message: `دوره ${targetCourse.title} با موفقیت حذف شد` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "خطای داخلی سرور" });
  }
};
