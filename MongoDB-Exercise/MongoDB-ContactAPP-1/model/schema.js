const mongoose = require("mongoose");

const Schema = mongoose.Schema;
let userSchema = new Schema({
  nama: {
    type: String,
    required: [true, "Nama tidak boleh kosong"],
    min: 2,
    max: 32,
    validate: {
      validator: (value) => {
        return /^[a-zA-Z\s]*$/.test(value);
      },
      message: "nama hanya boleh mengandung huruf dan space",
    },
  },
  nohp: {
    type: String,
    required: [true, "no HP tidak boleh kosong"],
    unique: [true, "Np HP yang anda masukan sudah terdaftar"],
    validate: {
      validator: (value) => {
        return /^((\+62)|0)[0-9]{9,12}$/.test(value);
      },
      message: "No HP yang anda masukan tidak valid",
    },
  },
  email: {
    type: String,
    lowercase: true,
    required: false,
    unique: [true, "Email yang anda masukan sudah terdaftar"],
    validate: {
      validator: (value) => {
        if (value === "") {
          return true;
        }
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
      },
      message: "Email yang anda masukan tidak valid",
    },
  },
});

const Contact = mongoose.model("Contact", userSchema, "Learn-1");

module.exports = { Contact };
