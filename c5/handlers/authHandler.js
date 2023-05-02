const User = require("../pkg/user/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");
const crypto = require("crypto");
const sendEmail = require("./nodemailer");
const sendMailGun = require("./mailgun");
exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      secure: false,
      httpOnly: true,
    });

    // await sendEmail({
    //   email: newUser.email,
    //   subject: "Nov korisnik",
    //   message: "Vi blagodarime za kreiranot profil",
    // });

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.login = async (req, res) => {
  try {
    // stara sintaksa
    // const email = req.body.email
    // const password = req.body.password
    // ponova sintaksa
    const { email, password } = req.body;
    console.log(email, password);
    // 1) Proveruvame dali ima vneseno email i pasvord
    if (!email || !password) {
      return res.status(400).send("Please provide email and password!");
    }

    // 2) Proveruvame dali korisnikot postoi
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send("invalid email or password!");
    }
    // 3) Sporeduvame pasvordite
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).send("invalid email or password!");
    }
    // 4) Generirame i isprakjame token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      secure: false,
      httpOnly: true,
    });

    res.status(201).json({
      status: "success",
      token,
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.logout = (req, res) => {
  res.cookie("jwt", "singedout", {
    expires: new Date(Date.now() + 5 * 50),
    httpOnly: true,
  });

  res.status(200).json({ loged: "logedoud" });
};

exports.protect = async (req, res, next) => {
  // console.log(req.headers);
  // 1) Go zemame tokenot i proveruvame dali e tamu
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  /////
  if (!token) {
    return res.status(500).send("You are not logged in!");
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);
  // 3) proveruvame dali korisnikot posti
  const userTrue = await User.findById(decoded.id);
  if (!userTrue) {
    return res.status(401).send("Used doenst longer exist!");
  }

  req.user = userTrue;

  next();
};

exports.forgotPassword = async (req, res) => {
  try {
    // 1) Da go pronajdime korisnikot so pomosh na negoviot mail
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(404)
        .send("Korisinikot ne posti ve molime kreairajte account!");
    }
    // 2) Kje generirame restiracki token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // 3) da go zapisime resitirackiot token vo data baza
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.passwordResetToken = hashedToken;
    user.passwordResetExpired = Date.now() + 30 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    // 4) Da isratime link do korisnickiot emal
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/resetPassword/${resetToken}`;
    const message = `Ja zaboravivte lozinkata ve molime promeneta lozinkata na ${resetUrl}`;

    await sendEmail({
      email: user.email,
      subject: "Your password reset token (30 min valid)",
      message: message,
    });

    await sendMailGun({
      email: user.email,
      subject: "Your password reset token (30 min valid)",
      message: message,
    });

    res.status(200).json({
      status: "success",
      message: "token sent to email!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const userToken = req.params.token;

    // 1) Da go dobieme korisnickiot dokument sto go ima toj token
    const hashedToken = crypto
      .createHash("sha256")
      .update(userToken)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpired: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).send("token is invalid or expired");
    }

    user.password = req.body.password;
    user.passwordResetExpired = undefined;
    user.passwordResetToken = undefined;

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      secure: false,
      httpOnly: true,
    });

    res.status(201).json({
      status: "success",
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
