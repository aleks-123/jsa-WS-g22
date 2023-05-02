const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: "api",
  key: "2efcbf5890084f958e15ae9420cd8541-70c38fed-0dec5f26",
});

const sendMailGun = async (options) => {
  // 1) Da gi definirame opciite na emailot

  const mailOptions = {
    from: "Semos <postmaster@semosacademy.mailgun.org>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  console.log(mailOptions);

  // da ispratime email koristejki Mailgun
  await mg.messages.create(
    "sandbox43c588f5abfa4eb7a9cbc957f503cbb3.mailgun.org",
    mailOptions
  );
};

module.exports = sendMailGun;
