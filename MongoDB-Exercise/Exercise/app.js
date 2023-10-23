const { MongoClient, ServerApiVersion } = require("mongodb");

//Koneksi ke URL
const url = "mongodb://127.0.0.1:27017//MongoDB-Learn";
// Buat instance MongoClient dengan mengoper URI koneksi
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const dbName = "MongoDB-Learn";

//connect ke MongoDB
async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to the MongoDB!");
    //membuat database dan collection jika belum ada
    const db = client.db(dbName);
    // Send ping buat confirmasi connect ke Database
    await db.command({ ping: 1 });
    console.log(`Your success connected to ${dbName}`);
    const collection = db.collection("Learn-1");

    // Dokument yang ingin di insert
    const insertDocument = {
      nama: "Sweden",
      email: "sweden@hotmail.com",
    };

    //TODO : 1. collection. insertOne() : Berfungsi menambahkan 1 document ke dalam collection
    // ----------------------------------------
    // const result = await collection.insertOne(insertDocument);

    // console.log(`Document is Success inserted with ID: ${result.insertedId}`);

    //TODO : 2. collection. insertMany() : Berfungsi menambahkan lebih dari 1 document ke dalam collection
    // ----------------------------------------

    // const insertDatas = await collection.insertMany([
    //   { nama: "Medan", email: "medan@gmail.com" },
    //   { nama: "Semarang", email: "semarang@gmail.com" },
    // ]);
    // // console.log("Daftar data yang Baru di Input :");
    // // console.log(typeof insertDatas);
    // console.log(insertDatas);

    // //TODO 3. collection.find().toArray : Berfungsi menampilkan contenction yang ada di dalam collection
    // // -------------------------------------------
    // const findDocuments = await collection.find().toArray();
    // console.log("contect of Collection :");
    // findDocuments.forEach((doucment) => {
    //   console.log(doucment);
    // });

    // //TODO 3.2. collection.find().toArray : Berfungsi menampilkan contenction yang ada di dalam collection sesuai kriteria
    // // -------------------------------------------
    // const findDocuments = await collection.find({ nama: "Randi" }).toArray();
    // console.log("contect of Collection :");
    // findDocuments.forEach((doucment) => {
    //   console.log(doucment);
    // });

    //TODO 4. db.listCollections : Berfungsi menampilkan daftar collection yang ada di dalam database
    // --------------------------------------------
    // const collections = await db.listCollections().toArray();
    // //menampilkan Daftar Collection
    // console.log("List of Collection :");
    // collections.forEach((collection) => {
    //   console.log(collection);
    // });

    //TODO 5. db.runCommand({}) : Berfungsi menjalankan perintah melaluin database
    // ---------------------------------------------------------------------------
    // const runCommand = await db
    //   .runCursorCommand({
    //     find: "Learn-1", // Nama collection yang ingin difilter
    //     filter: { nama: { $in: ["Randi", "Himawan"] } }, //difilter by nama randi dan himawan
    //     sort: { nama: 1 }, //diurutkan sesuai a ke z, kalau no, dari angka terendah
    //   })
    //   .toArray();
    // console.log(runCommand);

    //TODO 6. db.collection.updateOne(): Berfungsi mengupdate 1 data yang ada di dalam collection
    // --------------------------------------------------------------------------------------
    // const updateOne = await collection.updateOne(
    //   { nama: "semarang" },
    //   {
    //     $set: {
    //       nama: "Putri",
    //       nohp: "081133335555",
    //       email: "putri@gmail.com",
    //     },
    //   }
    // );
    // console.log(updateOne);

    // //TODO 7. db.collection.updateMany(): Berfungsi mengupdate lebih dari 1 data yang ada di dalam collection
    // const updateMany = await collection.updateMany(
    //   {
    //     nama: { $in: ["Randi", "Himawan"] },
    //     //filter berdasarkan dua nama
    //   },
    //   {
    //     $set: {
    //       //operator $set untuk menentukan perubahaan
    //       nohp: {
    //         $cond: {
    //           if: {
    //             $eq: ["$nama", "Randi"],
    //           }, //jika atas nama == "Randi"
    //           then: "081299998888",
    //           else: "085277778888",
    //         },
    //       },
    //     },
    //   }
    // );
    // console.log(updateMany);

    // const deleteOne = await collection.deleteOne({
    //   nama: "Semarang",
    // });
    // if (deleteOne.deletedCount === 1) {
    //   console.log("Document is Deleted!");
    // } else {
    //   console.log("File is not Found!");
    // }
  } finally {
    await client.close();
  }
}
connectDB().catch(console.dir);
