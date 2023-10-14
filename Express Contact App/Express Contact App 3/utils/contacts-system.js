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
const loadContacts = () => {
  const readData = fs.readFileSync("./data/contacts.json", "utf-8");
  //NOTE : JSON memiliki perilaku seperti array, jadi data dari dataInput dijadikan dalam bentu JSON, sehingga nanti kita bisa menggunakan metode push untuk memasukan data
  const saveData = JSON.parse(readData);
  return saveData; //return array of contacts
};

// cari contact berdasarkan nama
const findContact = (nama) => {
  const contacts = loadContacts();
  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );
  return contact;
};

// menuliskan/menimpa file contacts.json dengan data yang baru
const saveContacts = (contacts) => {
  fs.writeFileSync("./data/contacts.json", JSON.stringify(contacts));
};

const sortContacts = (contacts) => {
  contacts.sort((a, b) => {
    const namaA = a.nama.toLowerCase();
    const namaB = b.nama.toLowerCase();

    if (namaA < namaB) return -1;
    if (namaA > namaB) return 1;
    return 0;
  });
};

// menambahkan contact yang baru
const addContact = (contact) => {
  const contacts = loadContacts();
  contacts.push(contact);
  saveContacts(contacts);
};

// Check duplicate
// const checkDuplicate = (nama) => {
//   const contacts = loadContacts();
//   return contacts.find((contact) => contact.nama === nama);
// };

const checkDuplicateNama = (nama) => {
  const contacts = loadContacts();
  return contacts.find((contact) => {
    return contact.nama === nama;
  });
};

const checkDuplicateEmail = (email) => {
  const contacts = loadContacts();
  return contacts.find((contact) => {
    return contact.email === email;
  });
};
const checkDuplicatePhone = (nohp) => {
  const contacts = loadContacts();
  return contacts.find((contact) => {
    return contact.nohp === nohp;
  });
};

const deleteContact = (nama) => {
  const contacts = loadContacts();
  const filterContacts = contacts.filter((contact) => contact.nama !== nama);
  saveContacts(filterContacts);
};

//mengubah contacts
const updateContacts = (newContact) => {
  const contacts = loadContacts();
  //hilangkan contact lama yang sama dengan old nama
  const filterContacts = contacts.filter(
    (contact) => contact.nama !== newContact.oldNama
  );
  delete newContact.oldNama;
  delete newContact.oldNohp;
  delete newContact.oldEmail;

  filterContacts.push(newContact);
  sortContacts(filterContacts);
  saveContacts(filterContacts);
};

module.exports = {
  loadContacts,
  findContact,
  addContact,
  checkDuplicateNama,
  checkDuplicateEmail,
  checkDuplicatePhone,
  deleteContact,
  updateContacts,
};
