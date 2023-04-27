const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1) Kreiranje na transporter
  // const transporter = nodemailer.createTransport({
  //   service: "Gmail",
  //   auth: {
  //     user: "vashiot mail",
  //     pass: "vashiot passvord"
  //   }
  // })

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_ADRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2) Verifikacija na transporot ili logiranje

  transport.verify((err, succ) => {
    if (err) {
      console.log(err);
    } else {
      console.log("uspesno praten email");
    }
  });

  // 3) da gi definirame opccite na emailot
  const mailOptions = {
    from: "Semos academy <semos@academy.mk>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 4) Da go ispratime mailot
  // ova kje ni vrati promis
  await transport.sendMail(mailOptions);
};

module.exports = sendEmail;
