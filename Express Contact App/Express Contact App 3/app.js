const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const { body, validationResult, check } = require("express-validator");
const {
  loadContacts,
  findContact,
  addContact,
  checkDuplicateNama,
  checkDuplicateEmail,
  checkDuplicatePhone,
  deleteContact,
  updateContacts,
} = require("./utils/contacts-system.js");
const port = 3000;

//Gunakan EJS
app.set("view engine", "ejs");
app.use(expressLayouts);
//Built-in Middleware : Express static
app.use(express.static("public"));
//Built-in Middleware : Express urlencoded
app.use(express.urlencoded({ extended: true }));
//Flash Configuration
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

app.get("/", (req, res) => {
  // res.sendFile('index.html',{root : __dirname});
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

app.get("/about", (req, res) => {
  // res.sendFile('about.html',{root : __dirname});
  res.render("about", {
    title: "Halaman About",
    layout: "layouts/main-layout",
  });
});

// Halaman contact
app.get("/contact", (req, res) => {
  const contacts = loadContacts();

  res.render("contact", {
    title: "Halaman Contact",
    layout: "layouts/main-layout",
    contacts,
    msg: req.flash("msg"),
  });
});

//Halaman Penambahan Contact
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    title: "Halaman Penambahan Contact",
    layout: "layouts/main-layout",
  });
});

// proses penambahaan contact
app.post(
  "/contact",
  [
    // Validator of Nama (Custome Validator)
    body("nama").custom((value) => {
      const duplicate = checkDuplicateNama(value);
      if (duplicate) {
        throw new Error(`${value} sudah terdaftar di sistem Kontak!`);
      }
      return true;
    }),
    // Validator of Email
    body("email")
      .custom((value) => {
        const duplicate = checkDuplicateEmail(value);
        if (duplicate) {
          throw new Error(`email sudah terdaftar di sistem Kontak!`);
        }
        return true;
      })
      .isEmail()
      .optional({ checkFalsy: true })
      .normalizeEmail()
      .withMessage("email yang anda masukan tidak valid"),

    // Validator of Handphone number
    body("nohp")
      .custom((value) => {
        const duplicate = checkDuplicatePhone(value);
        if (duplicate) {
          throw new Error(
            `No HandPhone yang dimasukan sudah terdaftar di sistem Kontak!`
          );
        }
        return true;
      })
      .isMobilePhone()
      .withMessage("No Handphone yang anda masukan tidak valid"),
    //   check("nohp", "no Handphone yang anda masukan tidak valid").isMobilePhone(
    //     "id-ID"
    // ),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //   return res.status(400).json({ errors: errors.array() });
      res.render("add-contact", {
        title: "Halaman Penambahan Contact",
        layout: "layouts/main-layout",
        errors: errors.array(),
      });
    } else {
      addContact(req.body);
      // kirimkan flash message
      req.flash("msg", "data Contact berhasil ditambahkan ke Daftar Kontak!");
      res.redirect("/contact");
    }
    // console.log(req.body);
    //res.send(req.body);
  }
);

// Proses delete Contact
app.get("/contact/delete/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  // Jika kontak tidak ada
  if (!contact) {
    res.status(404);
    res.send("<h1>404</h1>");
  } else {
    deleteContact(req.params.nama);
    req.flash("msg", "data Contact berhasil dihapus dari Daftar Kontak!");
    res.redirect("/contact");
  }
});

//Halaman Perubahaan Contact
app.get("/contact/edit/:nama", (req, res) => {
  const contact = findContact(req.params.nama);
  res.render("edit-contact", {
    title: "Halaman Perubahaan Contact",
    layout: "layouts/main-layout",
    contact,
  });
});

// proses Update/ Perubahaan Data
app.post(
  "/contact/update",
  [
    // Validator of Nama (Custome Validator)
    body("nama").custom((value, { req }) => {
      const duplicate = checkDuplicateNama(value);
      if (value !== req.body.oldNama && duplicate) {
        throw new Error(`${value} sudah terdaftar di sistem Kontak!`);
      }
      return true;
    }),
    // Validator of Email
    body("email")
      .custom((value, { req }) => {
        const duplicate = checkDuplicateEmail(value);
        if (value !== req.body.oldEmail && duplicate) {
          throw new Error(`email sudah terdaftar di sistem Kontak!`);
        }
        return true;
      })
      .isEmail()
      .optional({ checkFalsy: true })
      .normalizeEmail()
      .withMessage("email yang anda masukan tidak valid"),

    // Validator of Handphone number
    body("nohp")
      .custom((value, { req }) => {
        const duplicate = checkDuplicatePhone(value);
        if (value !== req.body.oldNohp && duplicate) {
          throw new Error(
            `No HandPhone yang dimasukan sudah terdaftar di sistem Kontak!`
          );
        }
        return true;
      })
      .isMobilePhone()
      .withMessage("No Handphone yang anda masukan tidak valid"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("edit-contact", {
        title: "Halaman Ubah Data Contact",
        layout: "layouts/main-layout",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      updateContacts(req.body);
      // kirimkan flash message
      req.flash("msg", "data Contact berhasil diupdate di Daftar Kontak!");
      res.redirect("/contact");
    }
  }
);

//Halaman detail Contact
app.get("/contact/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  res.render("detail", {
    title: "Halaman Detail Contact",
    layout: "layouts/main-layout",
    contact,
  });
});
//app.use biasanya digunakan untuk menanganin file/ data yang tidak ada, jadi apapun yg tidak ada, akan dikembalikan ke app.use
//jangan letakan ini diatas, karena nt apapun datanya, walaupun ada, akan tetep menjalankan app.use dulu, sehingga app.get belum sempat jalan tapi hasil sudah keluar dari app.use
app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>Error : 404</h1>");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
