const yargs = require('yargs');
const contact = require('./contact-system.js');

yargs
    .command({
        command : 'add',
        describe : 'Memasukan Contact Baru',
        builder: {
            nama:{
                describe : 'Masukan Nama Lengkap',
                demandOption  : true,
                type:'string',
                alias:"n"
            },
            noHP:{
                describe : 'Silahkan masukan no HP anda',
                demandOption : true,
                type         : "string",
                alias        : "hp"
            },
            email:{
                describe :'Masukan email anda',
                demandOption   :false,
                default        :"Belum memasukan email",
                type           : "email",
                alias          : "e"
            }
        },
        handler:(argv) => contact.saveContacts(argv.nama,argv.noHP,argv.email),
    }).demandCommand();

//Menampilkan Contact list (nama dan noHP)
yargs
    .command({
        command : 'list',
        describe : 'Menampilkan Daftar Kontak',
        handler() {
            contact.listContacts();
        }
    })
    
//Menampilkan detail kontak berdasarkan Nama
yargs
    .command({
        command : 'detail',
        describe : 'Menampilkan detail Kontak berdasarkan Nama lengkap',
        builder: {
            nama:{
                describe : 'Masukan Nama Lengkap',
                demandOption  : true,
                type:'string',
                alias:"n"
            }
        },
        handler: (argv) => contact.detailContact(argv.nama)
});

yargs
    .command({
        command : 'delete',
        describe : 'Menghapus Kontak dari Daftar Kontak berdasarkan Nama lengkap',
        builder: {
            nama:{
                describe : 'Masukan Nama Lengkap',
                demandOption  : true,
                type:'string',
                alias:"n"
            }
        },
        handler: (argv) => contact.deleteContact(argv.nama)
});

yargs.parse();