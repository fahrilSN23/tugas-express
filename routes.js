const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
    const {page, total} = req.query;
    res.send({
        status: 'Berhasil',
        message: 'Selamat Datang di Warung Mama Etha, Silahkan pilih menu yang tersedia dengan link berikut. Makanan : http://localhost:3000/makanan dan Minuman : http://localhost:3000/minuman',
        page,
        total
    });
});

router.post('/:product/', upload.single('image'), (req, res) => {
    const {name, price, status} = req.body;
    const image = req.file;
    if (image) {
        const target = path.join(__dirname, 'uploads', image.originalname);
        fs.renameSync(image.path, target)
        res.json({
            name,
            price,
            status,
            image
        });
    }
});

router.get('/:category/', (req, res) => {
    const {category} = req.params;
    if (category == "makanan") {
        res.json({
            category,
            menu: "Nasi Goreng, Bakso, Mie Ayam"
        });
    }else{
        res.json({
            category,
            menu: "Es Teh, Teh Panas, Kopi"
        });
    }
});

module.exports = router;