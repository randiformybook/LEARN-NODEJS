const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const { body, validationResult, check } = require("express-validator");
const {
  loadContacts,
  findContact,
  addContact,
  checkDuplicateNama,
  checkDuplicateEmail,
  checkDuplicatePhone,
} = require("./utils/contacts-system.js");
const port = 3000;

//Gunakan EJS
app.set("view engine", "ejs");
app.use(expressLayouts);
//Built-in Middleware : Express static
app.use(express.static("public"));
//Built-in Middleware : Express urlencoded
app.use(express.urlencoded({ extended: true }));

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
        throw new Error(
          `atas nama : ${value}, Sudah Terdaftar di System Contact!`
        );
      }
      return true;
    }),
    // Validator of Email
    body("email")
      .custom((value) => {
        const duplicate = checkDuplicateEmail(value);
        if (duplicate) {
          throw new Error(
            `email dengan nama ${value}, Sudah Terdaftar di System Contact!`
          );
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
            `No HandPhone yang Anda masukan, Sudah Terdaftar di System Contact!`
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
      return res.status(400).json({ errors: errors.array() });
    }
    // console.log(req.body);
    //res.send(req.body);
    // addContact(req.body);
    // res.redirect("/contact");
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
