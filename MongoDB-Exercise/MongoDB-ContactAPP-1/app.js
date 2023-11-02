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
// const mongoose = require("mongoose");
// mongoose.connect("mongodb://127.0.0.1:27017/MongoDB-Learn");
require("./utils/db.js");
// ---------------------------------------------
//Schema
const { Contact } = require("./model/schema.js");
// ---------------------------------------------
// mongoose-unique-validator
const uniqueValidator = require("mongoose-unique-validator");
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

// -------------------------------------------------
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

// -------------------------------------------------
// Halaman ABOUT
app.get("/about", (req, res) => {
  res.render("about", {
    title: "Halaman About",
    layout: "layouts/main-layout",
  });
});

// -------------------------------------------------
// Halaman CONTACT
app.get("/contact", async (req, res) => {
  // Contact.find({}).then((result) => {
  //   res.send(result);
  // });

  const contacts = await Contact.find({});

  contacts.sort((a, b) => {
    const namaA = a.nama.toLowerCase();
    const namaB = b.nama.toLowerCase();

    if (namaA < namaB) return -1;
    if (namaA > namaB) return 1;
    return 0;
  });

  res.render("Contact", {
    title: "Halaman Contact",
    layout: "layouts/main-layout",
    contacts,
    msg: req.flash("msg"),
  });
});

//
//Halaman Penambahan Contact
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    title: "Halaman Penambahan Contact",
    layout: "layouts/main-layout",
  });
});

// -------------------------------------------------
// proses penambahaan contact
app.post("/contact", async (req, res) => {
  // ambil {nama,nohp,email} dari req.body
  const { nama, nohp, email } = req.body;
  const upperNama = nama.toUpperCase();
  const lowerEmail = email.toLowerCase();

  try {
    // instance ke variable newContact dengan menjalankan new contact(mongose model) yang isi sesuai dengan yang di input
    const newContact = new Contact({
      nama: upperNama,
      nohp,
      email: lowerEmail,
    });

    // validasi email
    const duplicate = await Contact.findOne({
      email: newContact.email,
    });
    // check ada email yang di duplicate
    if (duplicate && duplicate.email !== undefined && duplicate.email !== "") {
      return false;
    }
    // validasi nama,nohp dan email sesuai validator yang dibuat
    await newContact.validate();

    // // save ke data ke mongodb
    await newContact.save();

    // // setelah validator jalankan flash dan kembali ke halaman kontak
    req.flash("msg", "data Contact berhasil ditambahkan ke Daftar Kontak!");
    res.redirect("/contact");
  } catch (err) {
    // Menangani error yang terjadi saat validasi atau penyimpanan data
    console.error(`Gagal menyimpan data: ${err}`);
  }
});

// -------------------------------------------------
// Delete Contact
app.get("/contact/delete/:nama", async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });
  const contactID = contact._id;
  // Jika kontak tidak ada
  if (!contact) {
    res.status(404);
    res.send("<h1>404</h1>");
  } else {
    contact.deleteOne({ _id: contactID });
    req.flash("msg", `${contact.nama} berhasil dihapus dari Daftar Kontak!`);
    res.redirect("/contact");
  }
});

// -------------------------------------------------
// Halaman perubahaan/ update Contact
app.get("/contact/edit/:nama", async (req, res) => {
  // const { nama, nohp, email } = await Contact.findOne(req.params.nama);

  try {
    // mencari contact list yang akan diubah/update
    const contact = await Contact.findOne({ nama: req.params.nama });
    console.log(contact);
    if (!contact)
      throw new Error(
        res.status(404).send("<h1>Error : 404, Kontak tidak ditemukan</h1>")
      );
    res.render("edit-contact", {
      title: "Edit Data Contact",
      layout: "layouts/main-layout",
      contact,
    });
  } catch (err) {
    console.error(`Gagal mengambil data: ${err}`);
    res.status(500).send("Terjadi kesalahan saat mengambil data.");
  }
});
// ----------------------------------------------
// proses update contact
app.post("/contact/update", async (req, res) => {
  const { _id, nama, nohp, email } = req.body;
  try {
    const existingContact = await Contact.findOne({ noID: _id });
    const newNama = nama.toUpperCase();
    const newEmail = email.toLowerCase();
    const newHp = nohp;
    // jika contact sudah ada dengan sama nomor ID
    if (existingContact.nama !== newNama) {
      existingContact.nama = newNama;
    }
    if (existingContact.nohp !== newHp) {
      existingContact.nohp = newHp;
    }
    if (existingContact.email !== newEmail) {
      existingContact.email = newEmail;
    }

    // validasi email
    const duplicate = await Contact.findOne({ email });
    // check ada email yang di duplicate
    if ((duplicate && duplicate._id !== _id) || duplicate !== "")
      console.log("ada duplikat");
    // // if (duplicate && duplicate.email !== undefined && duplicate.email !== "") {
    // //   return false;
    // // }

    // validasi nama,nohp dan email sesuai validator yang dibuat
    await existingContact.validate();
    res.send(existingContact);
  } catch (err) {}
});
// ----------------------------------------------
//Halaman detail Contact
app.get("/contact/:nama", async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });

  res.render("detail", {
    title: "Halaman Detail Contact",
    layout: "layouts/main-layout",
    contact,
  });
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>Error : 404</h1>");
});

app.listen(port, () => {
  console.log(`Mongo Contact App | Server is running on ${port}`);
});
