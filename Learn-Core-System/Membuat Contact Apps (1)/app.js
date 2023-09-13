// const {questioner, saveContacts} = '.contact-system';
const contacts = require ('./contact-system');

(async function inputData(){
    const nama = await contacts.questioner('Silahkan masukan nama Anda :');
    const noHP = await contacts.questioner('Silahkan masukan no HP Anda :');
    const email = await contacts.questioner('Silahkan masukan alamat Email anda :');

    contacts.saveContacts(nama,noHP,email);
})();