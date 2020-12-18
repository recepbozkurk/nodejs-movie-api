//Mongoose'u dahil ediyorum
const mongoose = require('mongoose');

module.exports = () => {
    //MongoDB adresini ve DB adını vererek connect oluyorum
    mongoose.connect('mongodb://localhost/movie-api', { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection.on('open', () => {
        console.log("MongoDB : Connected.");
    });
    mongoose.connection.on('error', (err) => {
        console.log("MongoDB : Error.");
    });

    //Veritabanı işlemleri için promise tanımlamasını yapıyorum
    mongoose.Promise = global.Promise;
};