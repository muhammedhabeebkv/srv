const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
require("dotenv").config();

const database = require("./config/database.js");
const userRouter = require("./router/user");

// configuration
const app = express();
const PORT = process.env.PORT || 3001;
database((msg) => {
  console.log(msg);
});

// middleware configuration
app.use(express.static(path.join(__dirname, "dist")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: "interview-secret",
    name: "Set-Cookie",
    cookie: {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000 * 24 * 30,
    },
  })
);

// router configuration
app.use("/api/user", userRouter);
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"))
})

// Error handling middleware
app.use(function (err, req, res, next) {
  console.error("From Error handler: ", err.message);
  res.status(err.status || 500).json({ status: err.status || 500, message: err.message });
});

app.listen(PORT, () => console.log("listening on port: ", PORT));
