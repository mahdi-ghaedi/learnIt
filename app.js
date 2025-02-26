const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const MelipayamakApi = require("melipayamak");

// Routers
const userRouter = require("./modules/auth/user.routes");
const catRouter = require("./modules/categories/category.routes");
const adminRouter = require("./modules/admin/admin.routes");
const courseRouter = require("./modules/courses/courses.routes");
const commentRouter = require("./modules/comments/comment.routes");
const userCourseRouter = require("./modules/userCourse/userCourse.routes");

const app = express();

// Middlewares
//middle
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Routes

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/admin", adminRouter);
app.use("/auth", userRouter);
// app.use("/category", catRouter);
app.use("/category", (req, res) => {
  res.status(404).json({ Message: "category " });
});
app.use("/course", courseRouter);
app.use("/comment", commentRouter);
// app.post("/test", async (req, res) => {
//   console.log("object");
//   const username = "09921671045";
//   const password = "HBRYL";
//   const api = new MelipayamakApi(username, password);
//   const smsRest = api.sms();
//   const to = "09921671045";
//   const from = "50002710071045";
//   const text = ["li", "09991", "al"];
//   smsRest.sendByBaseNumber(text, to, 235776).then((response) => {
//     res.send(response);
//   });
// });

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ Message: "404 not found" });
});

module.exports = app;
