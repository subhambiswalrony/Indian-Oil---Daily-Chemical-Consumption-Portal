const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendOtpEmail(email, otp) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  const mailOptions = {
    from: `"IOCL OTP" <${process.env.MAIL_USER}>`,
    to: email,
    subject: 'Your OTP for Password Reset',
    text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = sendOtpEmail;
