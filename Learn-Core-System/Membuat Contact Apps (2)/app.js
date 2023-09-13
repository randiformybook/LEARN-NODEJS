const yargs = require('yargs');
//const { saveContacts } = require('./contact-system');
const contact = require('./contact-system.js');

// yargs.command('add','Menambahkan contact baru', () =>{},(argv)=>{
//     console.log(argv.nama);
// });

//yargs.command
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
        handler:(argv) =>{
            // const contact = {
            //     nama : argv.nama,
            //     noHP : argv.noHP,
            //     email : argv.email
            // };
            // console.log([contact])
            contact.saveContacts(argv.nama,argv.noHP,argv.email);
        },
    });

yargs.parse();