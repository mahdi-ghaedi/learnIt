const categoryModel = require("./categories.model");
const mongoose = require("mongoose");

// ایجاد دسته‌بندی جدید
exports.setCategory = async (req, res) => {
  try {
    const { title_fa, title_en } = req.body;

    if (!title_fa || !title_en) {
      return res
        .status(400)
        .json({ message: "عنوان فارسی و انگلیسی الزامی است" });
    }

    const newCat = await categoryModel.create({ title_fa, title_en });

    return res.status(201).json({
      message: `دسته‌بندی | ${newCat.title_fa} | با موفقیت ایجاد شد`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "خطای سرور" });
  }
};

// دریافت دسته‌بندی (همه یا یک مورد خاص)
exports.getCat = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "شناسه نامعتبر است" });
      }

      const category = await categoryModel.findById(id).lean();
      if (!category) {
        return res.status(404).json({ message: "دسته‌بندی یافت نشد" });
      }

      return res.status(200).json(category);
    } else {
      const categories = await categoryModel
        .find({})
        .select("title_fa title_en")
        .lean();

      return res.status(200).json(categories);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "خطای سرور" });
  }
};

// ویرایش دسته‌بندی
exports.edit = async (req, res) => {
  try {
    const { id } = req.params;
    const { title_fa, title_en } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "شناسه نامعتبر است" });
    }

    if (!title_fa || !title_en) {
      return res
        .status(400)
        .json({ message: "عنوان فارسی و انگلیسی الزامی است" });
    }

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { title_fa, title_en },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ message: "دسته‌بندی یافت نشد" });
    }

    return res.status(200).json({ message: `دسته‌بندی ویرایش شد` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "خطای سرور" });
  }
};

// حذف یک دسته‌بندی
exports.deleteOne = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "شناسه نامعتبر است" });
    }

    const category = await categoryModel.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: "دسته‌بندی یافت نشد" });
    }

    return res.status(200).json({ message: "دسته‌بندی حذف شد" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "خطای سرور" });
  }
};
