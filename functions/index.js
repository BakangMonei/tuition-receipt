const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bakangmonei2@gmail.com',
    pass: 'ooecgothgtofixdk',
  },
});

exports.sendEmailNotification = functions.firestore
  .document('applications/{applicationId}')
  .onCreate(async (snapshot, context) => {
    const data = snapshot.data();
    const mailOptions = {
      from: 'Making Application - Monei Bakang [Testing]',
      to: data.email,
      subject: 'Application Received',
      text: `Hello`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  });

const generateOtp = () => {
  return Math.floor(1000000 + Math.random() * 9000000).toString();
};

exports.sendOtpEmail = functions.https.onCall(async (data, context) => {
  const email = data.email;
  const otp = generateOtp();

  const mailOptions = {
    from: 'Monei Bakang - OTP Service',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent successfully ${otp}`);
    return { success: true, otp }; // Return OTP for verification purposes
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new functions.https.HttpsError('unknown', error.message, error);
  }
});
