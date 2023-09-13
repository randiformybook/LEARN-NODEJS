// TODO : Connect ke FileSystem NodeJS
const fs = require('node:fs');
const chalk = require('chalk');
const validator = require('validator');

//membuat folder data kalau belum ada
const dirPath = "../scripts/data";
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
};

//membuat file contact.json apabila belum ada
const fileContacts = "../scripts/data/contacts.json";
if (!fs.existsSync(fileContacts)){
    fs.writeFileSync(fileContacts,"[]","utf-8");
};
//Membaca File Contacts
const loadContact=()=>{
    const readData = fs.readFileSync('../scripts/data/contacts.json','utf-8');
    //NOTE : JSON memiliki perilaku seperti array, jadi data dari dataInput dijadikan dalam bentu JSON, sehingga nanti kita bisa menggunakan metode push untuk memasukan data
    const saveData = JSON.parse(readData);
    return saveData;  //return array of contacts
};

const saveContacts = (nama,noHP,email) =>{
    const dataInput = {nama,noHP,email};
    const saveData = loadContact();

    //check duplicate
    const duplicate = saveData.find(contact =>{
        return contact.nama === nama ||
        contact.noHP == noHP ||
        contact.email== email;
    });
    if(duplicate){
        console.log(chalk.bgRed.bold("Data yang Anda masukan,sudah terdaftar!, Mohon di periksa kembali"));
        return false;
    };
    if (email){
        if(!validator.isEmail(email)){
            console.log(chalk.bgRed.bold("Email yang Anda masukan tidak valid, Silahkan di periksa kembali"));
            return false;
        }
    }
    if(!validator.isMobilePhone(noHP,'id-ID')){
        console.log(chalk.bgRed.bold("No Handphone yang Anda masukan tidak valid, Silahkan di periksa kembali"));
        return false;
    }

    //Push saveData yang sudah dalam bentuk JSON ke dalam JSON  variabel saveData, sehingga ini akan menambah index savedata beru ke dalam array of JSON
    saveData.push(dataInput);

    //Sekarang data yang sudah ada di variabel saveData itu akan di masukan atau ditulis ke file contacts.json
    fs.writeFileSync('../scripts/data/contacts.json',JSON.stringify(saveData));

    console.log(chalk.bold.bgGreenBright('Terimah Kasih, data sudah masuk di data contact kami'));
}

//function untuk menampilkan Daftar Kontak
const listContacts = ()=>{
    const allContacts = loadContact();
    console.log(chalk.bold.bgCyan('Daftar Kontak :'));
    allContacts.forEach((contact, i) => {
        console.log(`${i+1}. ${contact.nama}-${contact.noHP}`);
    });
};

const detailContact =(nama) =>{
    const allContacts = loadContact();
    const findContact = allContacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
    if(!findContact){
        console.log(chalk.bgRed.bold(`nama ${nama} tidak terdaftar di Daftar Kontak, Silahkan check kembali!`));
        return false;
    }
    console.log(chalk.bold.bgCyan(`Nama = ${findContact.nama}`));
    console.log(chalk.bold.bgMagenta(`No HP = ${findContact.noHP}`));
    if(findContact.email){
        console.log(chalk.bold.bgYellow(`E-mail=  ${findContact.email}`))
    }
};

const deleteContact = (nama)=>{
    const allContacts = loadContact();
    const deleteContact = allContacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase()); 
    //=> maksud dari deleteContact ialah filter nama2 yang di allContacts selain nama yg di seleksi atau nama2 yang tidak sama dengan nama yang seleksi, sehingga nama yg diseleksi tidak ada di variable delete contact yg berisi array baru.

    if(allContacts.length === deleteContact.length){
        console.log(chalk.bgRed.bold(`nama ${nama} tidak terdaftar di Daftar Kontak, Silahkan check kembali!`));
        return false;
    }

    //Sekarang data yang sudah ada di variabel saveData itu akan di masukan atau ditulis ke file contacts.json
    fs.writeFileSync('../scripts/data/contacts.json',JSON.stringify(deleteContact));

    console.log(chalk.bold.green(`Nama ${nama}, sudah terhapus dari Daftar Kontak!`));
}

    module.exports = {
        saveContacts,
        listContacts,
        detailContact,
        deleteContact
    };
