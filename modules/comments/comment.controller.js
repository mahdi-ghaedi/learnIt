const commentModel = require("./comments.model");

exports.newComment = async (req, res) => {
  const targetItem = req.params.targetId;
  const parentIdComment = req.params.commentId;
  const { text } = req.body;

  try {
    if (parentIdComment) {
      // پاسخ به کامنت
      const newReply = {
        author: req.userInfo.fullname,
        text,
        parent: parentIdComment,
        targetItem,
      };

      const resultRepo = await commentModel
        .findOne({ _id: parentIdComment })
        .lean();

      if (!resultRepo) {
        return res.status(404).json({ message: "کامنت والد پیدا نشد." });
      }

      let allReply = resultRepo.replies || [];

      const updatedComment = await commentModel.findOneAndUpdate(
        { _id: parentIdComment },
        { replies: [...allReply, newReply] },
        { new: true } // با این پارامتر، کامنت به‌روزرسانی شده بازگشت داده می‌شود
      );

      return res.status(200).json({
        message: "پاسخ شما با موفقیت ارسال شد.",
        reply: updatedComment.replies[updatedComment.replies.length - 1],
      });
    }

    // ارسال کامنت جدید (بدون والد)
    const newComment = await commentModel.create({
      author: req.userInfo.fullname,
      targetItem,
      text,
    });

    return res.status(201).json({
      message: "کامنت شما با موفقیت ارسال شد.",
      comment: newComment,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "مشکلی در ارسال کامنت پیش آمده است.", error });
  }
};
