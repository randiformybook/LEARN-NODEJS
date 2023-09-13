// TODO : Connect ke FileSystem NodeJS
const fs = require('node:fs');
const readline = require('node:readline');

const rl =  readline.Interface({
    input : process.stdin,
    output : process.stdout,
});

//membuat folder data kalau belum ada
const dirPath = "./data";
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
};

//membuat file contact.json apabila belum ada
const fileContacts = "./data/contacts.json";
if (!fs.existsSync(fileContacts)){
    fs.writeFileSync(fileContacts,"[]","utf-8");
};

//function dari questioner
const questioner = (questions) => {
    return new Promise((resolve)=>{
        rl.question(`${questions}`, (answer)=>{
            resolve(answer);
        });
    });
};

//the questioner
(async function inputData(){
    const nama = await questioner('Silahkan masukan nama Anda :');
    const noHP = await questioner('Silahkan masukan no HP Anda :');
    const email = await questioner('Silahkan masukan alamat Email anda :');
    
    const dataInput = {nama,noHP,email};
    const readData = fs.readFileSync('data/contacts.json','utf-8');
    //NOTE : JSON memiliki perilaku seperti array, jadi data dari dataInput dijadikan dalam bentu JSON, sehingga nanti kita bisa menggunakan metode push untuk memasukan data
    const saveData = JSON.parse(readData);

    //Push saveData yang sudah dalam bentuk JSON ke dalam JSON  variabel saveData, sehingga ini akan menambah index savedata beru ke dalam array of JSON
    saveData.push(dataInput);

    //Sekarang data yang sudah ada di variabel saveData itu akan di masukan atau ditulis ke file contacts.json
    fs.writeFileSync('data/contacts.json',JSON.stringify(saveData));
    //console.log(convertToJSON);

    rl.close();
})();

//inputData();