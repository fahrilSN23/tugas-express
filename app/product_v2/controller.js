const {Product, Op} = require('./model');
const path = require('path');
const fs = require('fs');

const index = async (req, res) => {
    const {search} = req.query;
    try {
        console.log(search)
        await Product.sync();
        if (search) {
            const result = await Product.findAll({
                where: {
                    name: {
                      [Op.like]: `%${search}%`
                    }
                  }
            });
            res.send(result);
        } else {
            const result = await Product.findAll();
            res.send(result);
        }
    }catch(e) {
        console.log(e);
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

const destroy = async (req, res) => {
    try {
        console.log(req.params.id);
        await Product.sync();
        const result = await Product.destroy({
            where: {
                id: req.params.id
            }
        });
        res.send({
            status: 'success',
            response: result
        });
    }catch(e) {
        console.log(e);
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
            console.log(e);
            res.send(e);
        }
    }
}

const update = async (req, res) => {
    const {name, price, stock, status} = req.body;
    const image = req.file;

    if (image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        try {
            await Product.sync();
            const result = await Product.update({name, price, stock, status, images_url: `http://localhost:3000/public/${image.originalname}`},
            {
                where: {
                    id: req.params.id
                }
            });
            res.send({
                status: 'success',
                response: result
            });
        }catch(e) {
            console.log(e);
            res.send(e);
        }
    }
}

module.exports = {
    index,
    view,
    store,
    update,
    destroy
}