const Movies = require("../models/MoviesModel");
const fs = require("fs");

const view = async (req, res) => {
  try {
    let record = await Movies.find({});
    return res.render("index", {
      record,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const form = (req, res) => {
  return res.render("form");
};

const addData = async (req, res) => {
  try {
    const { name, year, language, price } = req.body;

    await Movies.create({
      name,
      year,
      language,
      price,
      image: req.file.path,
    });

    console.log("Movie successfully added");
    return res.redirect("/");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const deleteData = async (req, res) => {
  try {
    let deleteRecord = await Movies.findById(req.query.id);
    fs.unlinkSync(deleteRecord.image);
    await Movies.findByIdAndDelete(req.query.id);
    console.log("Record deleted");
    return res.redirect("/");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const editData = async (req, res) => {
  try {
    let id = req.query.id;
    let single = await Movies.findById(id);
    return res.render("edit", { single });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const updateData = async (req, res) => {
  try {
      let id = req.body.editid;
      let updateFields = {
          name: req.body.name,
          year: req.body.year,
          language: req.body.language,
          price: req.body.price,
      };

      if (req.file) {
          let oldRecord = await Movies.findById(id);
          fs.unlinkSync(oldRecord.image);
          updateFields.image = req.file.path;
      }

      let up = await Movies.findByIdAndUpdate(id, updateFields);

      if (up) {
          console.log("Record updated");
          return res.redirect('/');
      }
  } catch (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
  }
};


module.exports = {
  view,
  form,
  addData,
  deleteData,
  editData,
  updateData,
};
