const fs = require("node:fs");

//membuat folder data kalau belum ada
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

//membuat file contact.json apabila belum ada
const fileContacts = "./data/contacts.json";
if (!fs.existsSync(fileContacts)) {
  fs.writeFileSync(fileContacts, "[]", "utf-8");
}
//ambil semua contact yang ada di contact.json
const loadContact = () => {
  const readData = fs.readFileSync("./data/contacts.json", "utf-8");
  //NOTE : JSON memiliki perilaku seperti array, jadi data dari dataInput dijadikan dalam bentu JSON, sehingga nanti kita bisa menggunakan metode push untuk memasukan data
  const saveData = JSON.parse(readData);
  return saveData; //return array of contacts
};

// cari contact berdasarkan nama
const findContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );
  return contact;
};

module.exports = { loadContact, findContact };
