const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/MongoDB-Learn");

// const Schema = mongoose.Schema;
// let userSchema = new Schema({
//   nama: { type: String, required: true },
//   nohp: { type: String, required: true },
//   email: String,
// });

// const User = mongoose.model("User", userSchema, "Learn-1");

// const newUser = new User({
//   nama: "ilyas",
//   nohp: "+6285349494949",
//   email: "ilyas@gmail.com",
// });

// newUser
//   .save()
//   // kalau ingin melihat hasil dari Save nya
//   .then((response) => {
//     console.log(response);
//     console.log("Success");
//   })
//   .catch((err) => {
//     console.error(err);
//     console.log("Tidak Success");
//   });
