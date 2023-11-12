const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

let userSchema = new Schema({
  nama: {
    type: String,
    required: [true, "Nama tidak boleh kosong"],
    unique: true,
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
    type: String,
    required: [true, "no HP tidak boleh kosong"],
    unique: true,
    validate: {
      validator: async function (value) {
        return /^((\+62)|0)[0-9]{9,12}$/.test(value);
      },
      message: "No HP yang anda masukan tidak valid",
    },
  },

  email: {
    type: String,
    lowercase: true,
    unique: false,
    required: false,
    sparse: true,
    validate: {
      validator: async function (value) {
        console.log(this.get("id"));
        const existingContact = await mongoose.models.Contact.findOne({
          email: value,
        });
        if (
          existingContact &&
          value === existingContact.email &&
          this.id === existingContact.id
        )
          return true;

        if (
          existingContact &&
          value === existingContact.email &&
          this.id !== existingContact.id
        ) {
          console.log(this.id);
          console.log(existingContact.id);
          throw new Error("duplicate ngk ya?");
        }

        if (value === null || value === "") return true;
        else {
          const regexPattern =
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
          return regexPattern.test(value); // Return true if there is no existing contact with the same email
        }
      },
    },
    message: "Email yang anda masukan tidak valid",
  },
});

// userSchema.plugin(uniqueValidator);

const Contact = mongoose.model("Contact", userSchema, "Learn-1");
Contact.ensureIndexes();

module.exports = { Contact };
