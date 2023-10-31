const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;
let userSchema = new Schema({
  nama: {
    type: String,
    required: [true, "Nama tidak boleh kosong"],
    unique: [true, "Nama yang anda masukan sudah terdaftar"],
    min: 2,
    max: 32,
    validate: {
      validator: async (value) => {
        const duplicate = await Contact.find({ nama: value });
        if (duplicate) {
          console.log(`ada duplicate : ${duplicate}`);
          return false;
        }
        return /^[a-zA-Z\s]*$/.test(value);
      },
      message: "nama yang anda masukan tidak valid",
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
    unique: true,
    lowercase: true,
    required: false,
    sparse: true,
    validate: {
      validator: (value) => {
        if (value === "" || value === undefined) {
          return true;
        } else {
          // /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value),
          /^(?:[a-zA-Z0-9._-]+@gmail\.com|[a-zA-Z0-9._-]+@yahoo\.com|[a-zA-Z0-9._-]+@msn\.com)$/.test(
            value
          );
        }
      },
    },
    message: "Email yang anda masukan tidak valid",
  },
});

const Contact = mongoose.model("Contact", userSchema, "Learn-1");

module.exports = { Contact };
