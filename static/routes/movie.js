const express = require('express');
const router = express.Router();

//Movie Model'imi import ediyorum
const Movie = require('../models/Movie');

router.post('/', (req, res, next) => {
    //Body'de gelen değerleri movie şemamdaki keylerle eşleştirerek atıyorum    
    const movie = new Movie(req.body);

    //oluşturduğum movie şemasını promise yapısı ile veritabanına kaydediyorum
    const promise  = movie.save();

    //Promiseden dönen sonucu gönderiyorum
    promise.then((data) => {res.json({ status: true })})
        .catch((err) => { res.json(err)});
});

module.exports = router;