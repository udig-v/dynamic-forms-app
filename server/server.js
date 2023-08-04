const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth");
const formRoutes = require("./routes/forms");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/error");

const app = express();

dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(cookieParser());

app.use("/api/users", authRoutes);
app.use("/api/forms", formRoutes);


app.get("/", (req, res) => {
  res.send("API is running...");
});

app.post("/", (req, res) => {
  res.send("Hello");
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
