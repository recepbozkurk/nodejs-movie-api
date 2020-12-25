//Express frameworkü import ediyorum
const express = require('express');
//Express'in instance'ını oluşturuyorum
const app = express();
//HTML dosyamı engine edebilmek için consolidate'i import ediyorum
const cons = require('consolidate');
//Router olarak tanımladığım dosyayı import ediyorum
const signIn = require('./routes/signIn');
const movie = require('./routes/movie');
//Body parser ile gelen json parametlerini okuyabiliyorum
const bodyParser = require('body-parser');

//MongoDB Connection
const db = require('../helper/db')();

//body-parser tanımlamaları
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

// '/' dizini altında signIn router'ını tanımlıyorum
app.use('/', signIn);
app.use('/api/movie', movie);

// view engine setup : HTML dosyalarımın olduğu views'ı belirtiyorum
app.engine('html', cons.swig)
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

//css ve html'lerimi tuttuğum statik dosya isimlerini belirtiyorum
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index');
});

//Error Handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.json({ error : err.message, code: err.code});
});

//Express serverı dinleyeceğim port ayarlarını yapıyorum
app.listen(3000, () => {
    console.log('Express Server is working!');
});