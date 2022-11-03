const cors = require("cors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var authRouter = require("./routes/auth");
var indexRouter = require("./routes/index");
var userRouter = require("./routes/user");
var dataRouter = require("./routes/data");
var tracked_itemsRouter = require("./routes/tracked_items");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", authRouter);
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use(dataRouter);
app.use(tracked_itemsRouter);

module.exports = app;
