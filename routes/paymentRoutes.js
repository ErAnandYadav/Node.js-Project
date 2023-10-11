const express = require("express");
const router = express.Router();
const payment = require("../controllers/paymentControllers");

router.post("/create-checkout-session", payment.createCheckoutSession);
router.get("/success", payment.success);
router.get("/cancel", payment.cancel);
module.exports = router;