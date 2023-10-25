const mongoose = require("mongoose");

const Schema = mongoose.Schema;
let userSchema = new Schema({
  nama: { type: String, required: true },
  nohp: { type: String, required: true },
  email: String,
});

const Contact = mongoose.model("Contact", userSchema, "Learn-1");

module.exports = Contact;
