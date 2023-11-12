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
// mongoose.connect("mongodb://127.0.0.1:27017/MongoDB-Learn");
require("./utils/db.js");
// ---------------------------------------------
//Schema
const { Contact } = require("./model/schema.js");
// ---------------------------------------------
// mongoose-unique-validator
// const uniqueValidator = require("mongoose-unique-validator");
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
    const namaA = a.nama.toUpperCase();
    const namaB = b.nama.toUpperCase();

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
// ambil {nama,nohp,email} dari req.body
app.post("/contact", async (req, res) => {
  // ambil {nama,nohp,email} dari req.body
  const { nama, nohp, email } = req.body;
  const upperNama = nama.toUpperCase();
  const lowerEmail = email ? email.toLowerCase() : null;

  try {
    const newContact = new Contact({
      nama: upperNama,
      nohp,
      email: lowerEmail,
    });

    // Cek apakah ada duplikat email
    const duplicate = await Contact.findOne({ email });

    if (
      (duplicate && duplicate.email === null) ||
      (duplicate && duplicate.email === undefined) ||
      (duplicate && duplicate.email === "")
    ) {
      await newContact.validate({ fields: [nama, nohp] });
      console.log("yes");
    } else {
      // validasi nama,nohp dan email sesuai validator yang dibuat
      await newContact.validate();
      console.log("no");
    }

    // save ke data ke mongodb
    await newContact.save();

    // setelah validator jalankan flash dan kembali ke halaman kontak
    req.flash("msg", "data Contact berhasil ditambahkan ke Daftar Kontak!");
    res.redirect("/contact");
  } catch (err) {
    // Menangani error yang terjadi saat validasi atau penyimpanan data
    console.error(`Gagal menyimpan data: ${err}`);

    if (err.code === 11000 && err.keyPattern.email) {
      // kesalahan duplikat kunci, berarti ada kontak lain yang memiliki email yang sama
      if (err.keyValue.email === null) {
        // Kasus khusus jika terdapat duplikat kunci dengan email null (string kosong)
        res.status(409).send("Email sudah digunakan.");
      } else {
        res.status(409).send("Email sudah digunakan.");
      }
    } else if (err.name === "ValidationError") {
      // kesalahan validasi, berarti ada data yang tidak memenuhi skema
      res.status(400).send("Data tidak valid.");
    } else {
      // kesalahan lain, berarti ada masalah dengan server atau database
      res.status(500).send("Terjadi kesalahan saat menambahkan kontak.");
    }
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
app.get("/contact/edit/:_id", async (req, res) => {
  // const { nama, nohp, email } = await Contact.findOne(req.params.nama);
  try {
    // mencari contact list yang akan diubah/update
    const contact = await Contact.findOne({ _id: req.params._id });

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
    const newNama = nama.toUpperCase();
    const newEmail = email.toLowerCase();
    const newHp = nohp;
    const theID = req.body.contactID;

    await Contact.findOneAndUpdate(
      { _id: theID },
      {
        nama: newNama,
        email: newEmail,
        nohp: newHp,
      },
      {
        new: true,
        upsert: false,
        omitUndefined: true,
        returnDocument: "after",
        runValidators: true,
      }
    );

    // setelah validator jalankan flash dan kembali ke halaman kontak
    req.flash("msg", "data Contact berhasil diupdate ke Daftar Kontak!");
    res.redirect("/contact");
  } catch (err) {
    console.error(`Gagal menyimpan data: ${err}`);

    if (err.code === 11000) {
      // kesalahan duplikat kunci, berarti ada kontak lain yang memiliki nama, nohp, dan email yang sama
      res.status(409).send("Kontak sudah ada.");
    } else if (err.name === "ValidationError") {
      // kesalahan validasi, berarti ada data yang tidak memenuhi skema
      res.status(400).send("Data tidak valid.");
    } else {
      // kesalahan lain, berarti ada masalah dengan server atau database
      res.status(500).send("Terjadi kesalahan saat memperbarui kontak.");
    }
  }
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
