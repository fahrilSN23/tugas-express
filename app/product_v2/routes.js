const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const productController2 = require('./controller');

router.get('/product_view', productController2.index);
router.get('/product_view/:id', productController2.view);
router.post('/product_v2', upload.single('images_url'), productController2.store);

module.exports = router;
