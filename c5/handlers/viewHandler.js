const Avtomobil = require("../pkg/avtomobili/avtoSchema");

exports.oglasView = async (req, res) => {
  try {
    const oglasi = await Avtomobil.find();

    res.status(200).render("oglas", {
      status: "success",
      naslov: "Oglas",
      kategorija: "Koli",
      oglasi,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error with this page");
  }
};

exports.createOglas = async (req, res) => {
  try {
    console.log(req.body);

    if (req.file) {
      req.body.slika = req.file.filename;
    }

    await Avtomobil.create(req.body);
    res.redirect("/oglas");
  } catch (err) {
    res.status(500).send("Error");
  }
};

exports.getLoginForm = (req, res) => {
  try {
    res.status(200).render("login", {
      title: "Login",
    });
  } catch (err) {
    res.status(500).send("Error");
  }
};
