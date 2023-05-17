const Univerzitet = require("../pkg/unverzitet/univerzitetSchema");

exports.getAll = async (req, res) => {
  try {
    const univerziteti = await Univerzitet.find();

    res.status(200).json({
      status: "success",
      data: {
        univerziteti,
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
    const univerzitet = await Univerzitet.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        univerzitet,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const univerzitet = await Univerzitet.findByIdAndUpdate(
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
        univerzitet,
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
    await Univerzitet.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.create = async (req, res) => {
  try {
    const novUniverzitet = await Univerzitet.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        univerzitet: novUniverzitet,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
