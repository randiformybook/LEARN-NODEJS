const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

// Menentukan path ke direktori tempat file-file Anda berada
const rootDir = path.join(__dirname, 'Learn-nodeJS', 'Learn-webServer', 'What Express npm is');

app.get('/',(req,res)=>{
    // res.send('<h1>Hello World !</h1>');
    // res.json({
    //     nama : 'Randi Himawan',
    //     noHP : '081264314878',
    //     email : 'hrandi1989@gmail.com'
    // });
    res.sendFile('index.html',{root : __dirname});
});

app.get('/about',(req,res)=>{
    res.sendFile('about.html',{root : __dirname});
});

app.get('/contact',(req,res)=>{
    res.send('ini adalah Halaman Contact');
});

app.get('/product/:id/category/:id_cat', (req,res)=>{
    res.send(`Product ID : ${req.params.id}<br>
    Category ID: ${req.params.id_cat}`);
})

app.get('/product/:id',(req,res)=>{
    res.send(`Product ID : ${req.params.id}<br>
    Category : ${req.query.category}`);
})

//app.use biasanya digunakan untuk menanganin file/ data yang tidak ada, jadi apapun yg tidak ada, akan dikembalikan ke app.use
//jangan letakan ini diatas, karena nt apapun datanya, walaupun ada, akan tetep menjalankan app.use dulu, sehingga app.get belum sempat jalan tapi hasil sudah keluar dari app.use
app.use('/',(req, res)=>{
    res.status(404);
    res.send('<h1>Error : 404</h1>');
})

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
});