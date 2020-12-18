const express = require('express');
//app.js dosyamda çok fazla get-post metodu birikmesin diye 
//rootları ayrıca tanımlayarak export edip app'te kullanacağım
const router = express.Router();

router.get('/signIn', (req, res) => {
    res.send("Sign In Page GET");
}); 

router.post('/signIn', (req, res) => {
    res.send("Sign In Page POST");
}); 

module.exports = router;