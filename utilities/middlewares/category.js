const categoryModel = require("../../modules/categories/categories.model");

exports.isExistCat = async (req, res, next) => {
  try {
    //* بررسی مقدار req.body قبل از پردازش
    if (!req.body || !req.body.title_fa || !req.body.title_en) {
      return res.status(400).json({ message: "اطلاعات ورودی نامعتبر است." });
    }

    //* بررسی وجود دسته‌بندی با عنوان فارسی یا انگلیسی
    const targetCat = await categoryModel.findOne({
      $or: [{ title_fa: req.body.title_fa }, { title_en: req.body.title_en }],
    });

    if (targetCat) {
      return res
        .status(400)
        .json({ message: "این دسته‌بندی از قبل وجود دارد." });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "خطای سرور", error });
  }
};
