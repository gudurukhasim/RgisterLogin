const nodemailer = require('nodemailer');
const user = "gudurukhasim@gmail.com"
const pass = "oqiyqymzjwgccbuh"
console.log(user ,pass)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: user  , // Your email

    pass: pass,    // Your email password
  },
});

module.exports = transporter;
