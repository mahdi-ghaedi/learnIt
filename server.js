const app = require("./app"); // اپ Express را از فایل app صادر کرده‌ایم

require("dotenv").config();
const mongoose = require("mongoose");
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // تنظیم timeout برای MongoDB
};

const runDB = async () => {
  try {
    await mongoose.connect(process.env.URI, mongooseOptions);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  }
};
const runPort = () => {
  const port = process.env.PORT || 3000; // پورت خودکار توسط Vercel
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

const runServer = async () => {
  await runPort();
  await runDB(); // ابتدا اتصال به DB برقرار می‌شود
};
runServer();
