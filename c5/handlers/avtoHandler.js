const Avtomobil = require("../pkg/avtomobili/avtoSchema");

const multer = require("multer");
const uuid = require("uuid");

// Generirajme uniqe id
const imageId = uuid.v4();

// const upload = multer({ dest: "public/img/avtomobili" });

const multerStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/img/avtomobili");
  },
  filename: (req, file, callback) => {
    // kola-unikatenid-vreme.jpg -- vakvo imenuvanje kje ni garantira da nema povekje sliki so isto ime
    const type = file.mimetype.split("/")[1];
    callback(null, `kola-${imageId}-${Date.now()}.${type}`);
  },
});

const multerFilter = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("Fajlot ne e suportiran"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadCarsPhoto = upload.single("slika");

exports.update = async (req, res) => {
  try {
    console.log(req.file);
    console.log(req.body);

    if (req.file) {
      req.body.slika = req.file.filename;
    }
    console.log(req.body.slika);

    // input da ima type file

    const avtomobil = await Avtomobil.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        avtomobil,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.create = async (req, res, next) => {
  try {
    console.log(req.body);
    const novAvtomobil = await Avtomobil.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        avtomobil: novAvtomobil,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const avtomobili = await Avtomobil.find();

    res.status(200).json({
      status: "success",
      data: {
        avtomobili,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    const avtomobil = await Avtomobil.findById(req.params.x);

    res.status(200).json({
      status: "success",
      data: {
        avtomobil,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    await Avtomobil.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
};
