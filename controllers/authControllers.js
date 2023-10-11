const User = require("../models/user");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const helpers = require("../utils/helpers");
const signup = async (req, res) => {
  try {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const verificationToken = uuidv4();
    const existingUser = await User.findOne({ email });

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fname: fname,
      lname: lname,
      email: email,
      password: hashedPassword,
      verificationToken: verificationToken,
    });
    newUser
      .save()

      .then(() => {
        helpers.sendVerificationEmail(email, verificationToken);
        return res.status(200).json({
          message:
            "User registered successfully. Please check your email for verification.",
        });
      })

      .catch((err) => {
        return res.status(500).json({ error: err });
      });
  } catch (error) {
    console.log(error);
    res.status(400).send("Invalid Email");
  }
};

const verify = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ verificationToken: token });
    console.log(user.isVerified);
    if (!user) {
      req.flash("error", "Invalid verification token!");
      return res.redirect("/");
    }
    if (user.isVerified == true) {
      req.flash("error", "Your account is already verified!");
      return res.redirect("/");
    }

    await User.updateOne({ _id: user._id }, { $set: { isVerified: true } });
    req.flash("success", "Your account has been verified!");
    res.redirect("/");
  } catch (error) {
    console.error("Email verification failed", error);
    req.flash("error", "Invalid verification token!");
    res.redirect("/");
  }
};

const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password);
    const user = await User.findOne({ email });
    if (!user) {
      req.flash("error", "Invalid email password!");
      return res.redirect("/");
    }
    if (!user.isVerified == true) {
      req.flash("error", "Your account is not verified. Please check your mail to verify your account.");
      return res.redirect("/");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      req.flash("error", "Invalid email password!");
      return res.redirect("/");
    }
    req.session.user = user;
    req.flash("success", "Login successful!");
    res.redirect("/");
  } catch (error) {
    console.error("Error during login:", error);
    req.flash("error", "An error occurred during login!");
    res.redirect("/");
    // res.status(500).json({ error: "An error occurred during login" });
  }
};

const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    } else {
      return res.redirect("/");
    }
  });
};

const forgotPassword = async (req, res) => {
  console.log("function called");
  const email = req.body;
  console.log(email);
  const user = await User.findOne(email);
  const userName = user.fname+ ' ' + user.lname
  if (!user) {
    res.status(400).json({ error: "User not found!" });
  }
  const token = uuidv4();
  user.forgotPasswordToken = token;
  user.forgotPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
  await user.save();
  helpers.sendForgotPasswordEmail(email, token, userName);
  res.json({ message: "An email has been sent to anandraj9249@gmail.com. If this email address is registered to Synotech.com, you'll receive instructions on how to set a new password." });
};

const resetPassword = async(req, res) =>{
  const user = req.session.user;
  const successMessage = req.flash('success');
  const errorMessage = req.flash('error');
  const { token } = req.params
  const checkUser = await User.findOne({
    forgotPasswordToken:token,
    forgotPasswordExpires:{ $gt: Date.now() },
  });
  if (!checkUser) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }
  
  res.render('showErrorMessage', {user, token, errorMessage, successMessage });
}

const updateNewPassword = async(req, res) =>{
  const { token } = req.params
  const newPassword = req.body.password;
  const confirmNewPassword = req.body.confirmPassword
  console.log(token,newPassword, confirmNewPassword,"877777777777777777");
  const user = await User.findOne(token)
  if (!user){
    console.log("][][][][][][][][][][][]");
    res.json({error:"user not found!"})
  }
  user.password = newPassword
  await user.save()
  res.json({message:"Password reset successfully!"})
}

module.exports = { signup, verify, login, logout, forgotPassword, resetPassword, updateNewPassword };
