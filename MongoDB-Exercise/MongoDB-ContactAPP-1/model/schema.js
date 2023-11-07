const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;
let userSchema = new Schema({
  nama: {
    type: String,
    required: [true, "Nama tidak boleh kosong"],
    // unique: [true, "Nama yang anda masukan sudah terdaftar"],
    minlength: [3, "Nama minimal harus terdiri dari 3 huruf"],
    maxlength: [32, "Nama minimal harus terdiri dari 32 huruf"],
    validate: {
      validator: async function (value) {
        return /^[a-zA-Z\s]*$/.test(value);
      },
      message: "nama yang anda masukan tidak valid",
    },
  },

  // Validasi NO HP
  nohp: {
    type: String, //Bertype String
    required: [true, "no HP tidak boleh kosong"],
    // unique: [true, "Np HP yang anda masukan sudah terdaftar"],
    validate: {
      validator: async function (value) {
        return /^((\+62)|0)[0-9]{9,12}$/.test(value);
      },
      message: "No HP yang anda masukan tidak valid",
    },
  },

  email: {
    type: String,
    unique: false,
    lowercase: true,
    required: false,
    sparse: true,
    validate: {
      validator: async function (value) {
        if (!value || value === "" || value === null) {
          return true;
        }
        const regexPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regexPattern.test(value);
      },
    },
    message: "Email yang anda masukan tidak valid",
  },
});

userSchema.index({ nama: 1, nohp: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true, sparse: true });

const Contact = mongoose.model("Contact", userSchema, "Learn-1");

module.exports = { Contact };
