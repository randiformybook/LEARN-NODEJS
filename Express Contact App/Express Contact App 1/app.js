const express = require("express");
const expressLayouts = require("express-ejs-layouts");
// const morgan = require("morgan");
const app = express();
const port = 3000;

//Gunakan EJS
app.set("view engine", "ejs");
app.use(expressLayouts);
// app.use(morgan("dev"));

//Built-in Middleware : Express static
app.use(express.static("public"));

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

app.get("/contact", (req, res) => {
  // res.sendFile('contact.html',{root : __dirname});
  res.render("contact", {
    title: "Halaman Contact",
    layout: "layouts/main-layout",
  });
});

// app.get("/product/:id/category/:id_cat", (req, res) => {
//   res.send(`Product ID : ${req.params.id}<br>
//     Category ID: ${req.params.id_cat}`);
// });

// app.get("/product/:id", (req, res) => {
//   res.send(`Product ID : ${req.params.id}<br>
//     Category : ${req.query.category}`);
// });

//app.use biasanya digunakan untuk menanganin file/ data yang tidak ada, jadi apapun yg tidak ada, akan dikembalikan ke app.use
//jangan letakan ini diatas, karena nt apapun datanya, walaupun ada, akan tetep menjalankan app.use dulu, sehingga app.get belum sempat jalan tapi hasil sudah keluar dari app.use
app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>Error : 404</h1>");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
