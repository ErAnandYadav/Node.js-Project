// config/stripe.js
const stripeSecretKey = 'sk_test_51NOJ7JSHCOsFNQDpFjkBEwBejzQPrm4YDD4Ds6JUKTRefJfoWc1ublK0R2fjOuhMwzfr6IgNSUNjaSG6wq2QpFEF00jwp2Xw6O'; // Replace with your Stripe secret key
const stripePublicKey = 'pk_test_51NOJ7JSHCOsFNQDprLHelXVJw4ctY52EVbCWKKBBKA9BhqmHScpAIdGtApinpFrpDeBeaqy9CiKDloY3doPtUD7L00DNlHqeiD'; // Replace with your Stripe public key
const priceId = 'price_1NPMUKSHCOsFNQDprHRzdfpd'
module.exports = {
  stripeSecretKey,
  stripePublicKey,
  priceId,
};
