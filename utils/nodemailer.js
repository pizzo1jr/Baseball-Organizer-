module.exports = (mail, auth_code, url) => {

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'adcosta2000@gmail.com',
    pass: 'byvpaqlojejfolpe'
  }
});

const mailOptions = {
  from: 'adcosta2000@gmail.com',
  to: mail,
  subject: 'Change your password',
  text: `Your Authentication code is ${auth_code}`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

}