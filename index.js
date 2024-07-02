const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const templateRoutes = require("./routes/template");
const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/tampermonkey";
const JWT_SECRET = process.env.JWT_SECRET || "your_default_secret";

// Enable CORS for all routes
app.use(cors());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/templates", templateRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
