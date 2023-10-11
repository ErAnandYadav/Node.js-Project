const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const User = require("./models/user");
const database = require("./config/database");
const authRouter = require("./routes/authRoutes");
const adminRoutes = require('./routes/admin');
const paymentRoutes = require('./routes/paymentRoutes');
const isLogin = require("./middleware/authMiddleware");
const flash = require('connect-flash');
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(express.json());

app.use(flash());
app.use(
  session({
    secret: "LoginSession",
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  const user = req.session.user;
  const successMessage = req.flash('success');
  const errorMessage = req.flash('error');
  res.render("index", { user, successMessage,errorMessage });
});

app.get("/showErrorMessage", (req, res) => {
  const user = req.session.user;
  const successMessage = req.flash('success');
  const errorMessage = req.flash('error');
  res.render("showErrorMessage", {user, successMessage, errorMessage});
});
app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/services", (req, res) => {
  res.render("service");
});

app.get("/blog", (req, res) => {
  res.render("blogs");
});

app.get("/portfolio", (req, res) => {
  res.render("portfolio");
});

app.get("/contact", (req, res) => {
  res.render("contact-us");
});



app.use("/auth", authRouter);
app.use("/payment", paymentRoutes);


// Admin Dashboard
app.use('/admin', adminRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
