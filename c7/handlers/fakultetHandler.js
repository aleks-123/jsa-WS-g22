const Fakultet = require("../pkg/unverzitet/fakultetSchema");

exports.getAll = async (req, res) => {
  try {
    const Fakulteti = await Fakultet.find();

    res.status(200).json({
      status: "success",
      data: {
        Fakulteti,
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
    const fakultet = await Fakultet.findById(req.params.id).populate(
      "profesori"
    );

    res.status(200).json({
      status: "success",
      data: {
        fakultet,
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
    const fakultet = await Fakultet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        fakultet,
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
    await Fakultet.findByIdAndDelete(req.params.id);

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
    const novFakultet = await Fakultet.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        Fakultet: novFakultet,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
