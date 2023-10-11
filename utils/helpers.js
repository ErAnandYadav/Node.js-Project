const nodemailer = require("nodemailer");
const fs = require("fs");
const ejs = require("ejs");
const path = require("path");

function sendVerificationEmail(email, verificationToken) {
  console.log(email, verificationToken);
  const verificationLink = `http://localhost:3000/auth/verify/${verificationToken}`;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use TLS
    auth: {
      user: "seo.webxender@gmail.com",
      pass: "jlgdebjqopxzknfs",
    },
  });

  const mailOptions = {
    from: "test data",
    to: email,
    subject: "Email Verification",
    html: `Click the following link to verify your email:<br> ${verificationLink}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Verification email sent:", info.response);
    }
  });
}

function sendForgotPasswordEmail(email, token, userName) {
  console.log(email.email, token);
  const sendLink = `http://localhost:3000/auth/reset-password/${token}`;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use TLS
    auth: {
      user: "seo.webxender@gmail.com",
      pass: "jlgdebjqopxzknfs",
    },
  });

  fs.readFile(path.join(__dirname) + "/email-templates.html", "utf8", (err, html) => {
      if (err) {
        console.error("Error reading template file:", err);
      }

      const compiledTemplate = ejs.compile(html);
      const currentDate = new Date();
      const options = { 
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      
      const formattedDate = currentDate.toLocaleDateString('en-US', options);
      const templateData = {
        name: userName,
        sendLink: sendLink,
        date: formattedDate,
      };
      const renderedTemplate = compiledTemplate(templateData);

      const mailOptions = {
        from: "seo.webxender@gmail.com",
        to: email.email,
        subject: "Reset your password",
        html: renderedTemplate,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Reset passwords email sent:", info.response);
        }
      });
    });
};

module.exports = { sendVerificationEmail, sendForgotPasswordEmail };


