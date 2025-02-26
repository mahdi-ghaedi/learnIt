require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const runServer = async () => {
  await runDB(); // ابتدا اتصال به DB برقرار می‌شود
  // runPort(); // بعد از اتصال به DB، سرور شروع به کار می‌کند
};

const runDB = async () => {
  try {
    // اطمینان از اتصال به MongoDB Atlas یا هر پایگاه داده ابری
    await mongoose.connect(process.env.URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // در صورت بروز خطا در اتصال به DB، برنامه خاتمه می‌یابد
  }
};

// const runPort = () => {
//   const port = process.env.PORT || 3000; // پورت خودکار توسط Vercel
//   app.listen(port, () => {
//     console.log(`Listening on port ${port}`);
//   });
// };

runServer();
