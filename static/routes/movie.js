const express = require('express');
const router = express.Router();

//Movie Model'imi import ediyorum
const Movie = require('../models/Movie');

router.get('/', (req, res) => {
    //find metodu ile mongoose veritabanından veri arıyorum(select)
    const promise = Movie.find({});

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

router.post('/', (req, res, next) => {
    //Body'de gelen değerleri movie şemamdaki keylerle eşleştirerek atıyorum    
    const movie = new Movie(req.body);

    //oluşturduğum movie şemasını promise yapısı ile veritabanına kaydediyorum
    const promise = movie.save();

    //Promiseden dönen sonucu gönderiyorum
    promise.then((data) => { res.json({ status: true }) })
        .catch((err) => { res.json(err) });
});

router.get('/top10', (req, res) => {
    //limit(10): top 10 getirir, sort -1 büyükten küçüğe sıralar
    const promise = Movie.find({}).limit(10).sort({ imdb_score: -1 });

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/:movie_id', (req, res, next) => {
    //findById ile id parametresine göre veri arıyorum
    const promise = Movie.findById(req.params.movie_id);

    promise.then((movie) => {
        res.json(movie);
    }).catch((err) => {
        next({ message: 'The movie is not found.', code: 99 });
    });
});

router.put('/:movie_id', (req, res, next) => {
    //findByIdAndUpdate ile id parametresine göre veriyi arayıp gelen parametreleri güncelliyorum
    //new: true ile response'da dönen datayı yeni data olarak belirtiyorum
    const promise = Movie.findByIdAndUpdate(req.params.movie_id, req.body, { new: true });

    promise.then((movie) => {
        res.json(movie);
    }).catch((err) => {
        next({ message: 'The movie is not found.', code: 99 });
    });
});

router.delete('/:movie_id', (req, res, next) => {
    //findByIdAndRemove ile id parametresine göre veriyi arayıp siliyorum
    const promise = Movie.findByIdAndRemove(req.params.movie_id);

    promise.then((movie) => {
        res.json({ message: "The movie deleted." });
    }).catch((err) => {
        next({ message: 'The movie is not found.', code: 99 });
    });
});

router.get('/between/:start_year/:end_year', (req, res) => {
    const { start_year, end_year } = req.params;
    console.log("Between is working. Start : " + start_year + " End : " + end_year);
    const promise = Movie.find({
        //gte:büyük eşittir, lte:küçük eşittir
        year: { "$gte": parseInt(start_year), "$lte": parseInt(end_year) }
    });

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});

module.exports = router;