const nama = 'randi himawan';
const umur = 34;

function myGreetings(nama,umur) {
    return`hai, ${nama}, umur saya ${umur} tahun`;
}

//? module.exports.nama = nama;
//? module.exports.umur = umur;
//? module.exports.myGreetings = myGreetings;

// atau juga bisa menuliskan  module export seperti object :
//? module.exports = {
//? nama : nama,
//? umur: umur,
//? myGreetings : myGreetings
// }

// contoh diatas, nama variabel object sama dengan nama isinya, maka dengan E6 (JS yang terbaru) kita bisa menuliskan seperti di bawah ini :
module.exports = {
    nama ,
    umur,
    myGreetings
}