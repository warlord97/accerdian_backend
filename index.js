const express = require("express");
const cors = require("cors");
const job = require("./cron/cron");

const referralRoute = require("./routes/referralRoute");
require("dotenv").config();

job.start();

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "https://accredian-frontend-blond.vercel.app",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
const PORT = process.env.PORT || 8080;

// Routes
app.use("/api/referrals", referralRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
