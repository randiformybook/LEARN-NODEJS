// Core System
// File System

const fs = require('node:fs');

//membuat folder menggunakan nodeJS secara (synchronous);
// ------------------------------------------------------
//NOTE: ini kalau sudah ada/ sudah terbuat, jangan dirunning lagi, atau di comment aja, karena akan membuat error nodeJS nya yang mengatakan folder already exist
//fs.mkdirSync('data');

//menuliskan dan membuat file secara (synchronous);
// ------------------------------------------------------
// try{
//     fs.writeFileSync('data/test-01.txt','Hello, saya lagi latihan menggunakan write file secara syncronous!');
// }catch(err){
//     console.log(err);
// }

// menuliskan dan membuat file secara (asynchronous);
// ------------------------------------------------------
// NOTE: kalau kita membuat nama file sama dengan nama file yang sudah ada, maka dia akan overwrite yang lama dengan yang baru, sehingga data/ isi filenya akan direplace dengan yang baru
// fs.writeFile('data/test-01.txt','Hello, saya lagi latihan menggunakan write file secara asyncronous!',(err) =>{
//     console.log(err);
// });

// membaca isi file secara (synchronous)
// ------------------------------------------------------
// const readData = fs.readFileSync('data/test-01.txt', 'utf-8');
// console.log(readData);

// membaca isi file secara (asyncronous)
// ------------------------------------------------------
// const readData = fs.readFile('data/test-01.txt','utf-8', (err,data)=>{
//     if(err){
//         throw err;
//     }
//     console.log(data);
// });

// console.log(readData);

// contoh Menggunakan readline
// ------------------------------------------------------
const readline = require('node:readline');

const rl = readline.Interface({
    input : process.stdin,
    output : process.stdout,
});

// contoh 1:
// rl.question('Hai,Silahkan Masukan Nama Anda :', (nama)=> {
//     console.log(`hai ${nama}, salam kenal`);
//     //NOTE: setelah menjawab pertanyaan, mesti masukan readline.interface.close (rl.close);
//     rl.close();
// });

// contoh 2:
rl.question('Hai,Silahkan Masukan Nama Anda :', (nama)=> {
    rl.question('Silahkan Masukan Tahun Kelahiran Anda :', (tahun)=>{
        let umur = 2023 - tahun;
        rl.question('Silahkan Masukan No HP Anda :', (noHP)=>{
            console.log(`Pendaftar dengan Nama ${nama}, umur ${umur}, no Hp yang dapat dihubungin: ${noHP}`);
            rl.close();
        });
    });
});