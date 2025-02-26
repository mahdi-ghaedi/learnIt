const app = require("../app");
require("dotenv").config();

const runServer = async () => {
  await runDB(); // ابتدا اتصال به DB برقرار می‌شود
  runPort(); // بعد از اتصال به DB، سرور شروع به کار می‌کند
};

const runDB = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // در صورت بروز خطا در اتصال به DB، برنامه خاتمه می‌یابد
  }
};

const runPort = () => {
  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
};

runServer();
