const stripeConfig = require("../config/stripe");
const stripe = require("stripe")(stripeConfig.stripeSecretKey);
const User = require("../models/user");
const Order = require('../models/orders');
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const helpers = require("../utils/helpers");

const createCheckoutSession = async (req, res) => {
  const priceId = stripeConfig.priceId;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const password = req.body.password;
  console.log(fname, lname, email, password,priceId);
  try {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      metadata: {
        fname: fname,
        lname: lname,
        email: email,
        password: password,
      },
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url:"http://localhost:3000/payment/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/payment/cancel",
    });
    console.log(stripeSession)
    res.json({ url: stripeSession.url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Checkout session creation failed" });
  }
};

const success = async (req, res) => {
  const session_id = req.query.session_id;
  const session = await stripe.checkout.sessions.retrieve(session_id);
  const currentDate = new Date();
  const totalDate = currentDate.setDate(currentDate.getDate() + 365)
  console.log(session);
  try {
    const fname = session.metadata.fname;
    const lname = session.metadata.lname;
    const email = session.metadata.email;
    const password = session.metadata.password;
    const subscriptionId = session.subscription;
    const subscriptionStatus = session.status;
    const subscriptionStartDate = new Date();
    const subscriptionEndDate = currentDate
    const customerId = session.customer;
    const paymentStatus = session.payment_status;
    const verificationToken = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const order = new Order({
      email: email,
      subscriptionId: subscriptionId,
      subscriptionStatus: subscriptionStatus,
      subscriptionStartDate: subscriptionStartDate,
      subscriptionEndDate: subscriptionEndDate,
      customerId: customerId,
      paymentStatus: paymentStatus,
    });
    order.save()
    const newUser = new User({
      fname: fname,
      lname: lname,
      email: email,
      password: hashedPassword,
      verificationToken: verificationToken,
    });
    newUser.save()
      .then(() => {
        helpers.sendVerificationEmail(email, verificationToken);
        res.status(200).json({
          message:"User registered successfully. Please check your email for verification.",
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

const cancel = async (req, res) => {
  res.status(200).json({ message: "Payment Failed" });
};

module.exports = {
  createCheckoutSession,
  success,
  cancel,
};
