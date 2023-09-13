// TODO : Connect ke FileSystem NodeJS
const fs = require("node:fs");
const readline = require("node:readline");

const rl = readline.Interface({
  input: process.stdin,
  output: process.stdout,
});

//membuat folder data kalau belum ada
const dirPath = "./scripts/data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

//membuat file contact.json apabila belum ada
const fileContacts = "./scripts/data/contacts.json";
if (!fs.existsSync(fileContacts)) {
  fs.writeFileSync(fileContacts, "[]", "utf-8");
}

//function dari questioner
const questioner = (questions) => {
  return new Promise((resolve) => {
    rl.question(`${questions}`, (answer) => {
      resolve(answer);
    });
  });
};

const saveContacts = (nama, noHP, email) => {
  const dataInput = { nama, noHP, email };
  const readData = fs.readFileSync("scripts/data/contacts.json", "utf-8");
  //NOTE : JSON memiliki perilaku seperti array, jadi data dari dataInput dijadikan dalam bentu JSON, sehingga nanti kita bisa menggunakan metode push untuk memasukan data
  const saveData = JSON.parse(readData);

  //Push saveData yang sudah dalam bentuk JSON ke dalam JSON  variabel saveData, sehingga ini akan menambah index savedata beru ke dalam array of JSON
  saveData.push(dataInput);

  //Sekarang data yang sudah ada di variabel saveData itu akan di masukan atau ditulis ke file contacts.json
  fs.writeFileSync("scripts/data/contacts.json", JSON.stringify(saveData));
  //console.log(convertToJSON);

  rl.close();
};

module.exports = {
  questioner,
  saveContacts,
};
