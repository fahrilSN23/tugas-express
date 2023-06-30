const Product = require('./model');
const path = require('path');
const fs = require('fs');

const index = async (req, res) => {
    const search = req.query;
    try {
        await Product.sync();
        const result = await Product.findAll({
            where: {
                title: {
                  [Op.like]: `%${search}%`
                }
              }
        });
        res.send(result);
    }catch(e) {
        res.send(e);
    }
}

const view = async (req, res) => {
    try {
        await Product.sync();
        const result = await Product.findAll({
            where: {
                id: req.params.id
            }
        });
        res.send(result);
    }catch(e) {
        res.send(e);
    }
}

const store = async (req, res) => {
    const {name, price, stock, status} = req.body;
    const image = req.file;
    if (image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        try {
            await Product.sync();
            const result = await Product.create({name, price, stock, status, images_url: `http://localhost:3000/public/${image.originalname}`});
            res.send(result);
        }catch(e) {
            res.send(e);
        }
    }
}

module.exports = {
    index,
    view,
    store
}