// Express view Engine require
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
// --------------------------------------------
//flash required
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
// ---------------------------------------------
const app = express();
const port = 3000;
// ---------------------------------------------
// Mongoose.connect =>
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/MongoDB-Learn");
// require("./utils/db.js");
// ---------------------------------------------
//Schema
const Contact = require("./model/schema.js");
// ---------------------------------------------
// setup EJS
app.set("view engine", "ejs");
// third party middlewate
app.use(expressLayouts);
//Built-in Middleware : Express static
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// ---------------------------------------------
// Flash Configuration
app.use(cookieParser("secret"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 6000 },
  })
);
app.use(flash());
// ---------------------------------------------

//Halaman HOME
app.get("/", (req, res) => {
  const mahasiswa = [
    {
      nama: "Randi Himawan",
      umur: 2023 - 1989,
      email: "hrandi1989@gmail.com",
    },
    {
      nama: "Putri Swandayani",
      umur: 2023 - 1990,
      email: "puu_tri@gmail.com",
    },
    {
      nama: "Udo",
      umur: 2023 - 1989,
      email: "udo@gmail.com",
    },
  ];
  res.render("index", {
    mahasiswa,
    title: "Home",
    layout: "layouts/main-layout",
  });
});

// Halaman ABOUT
app.get("/about", (req, res) => {
  res.render("about", {
    title: "Halaman About",
    layout: "layouts/main-layout",
  });
});

// Halaman CONTACT
app.get("/contact", (req, res) => {
  Contact.find({}).then((result) => {
    res.send(result);
  });
  // res.render("contact", {
  //   title: "Halaman Contact",
  //   layout: "layouts/main-layout",
  //   contacts,
  //   msg: req.flash("msg"),
  // });
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>Error : 404</h1>");
});

app.listen(port, () => {
  console.log(`Mongo Contact App | Server is running on ${port}`);
});
