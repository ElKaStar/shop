const { Product, ProductInfo, Images, Property, Catalogs } = require("../models/models");
const ApiError = require('../error/apiArror');
const sequelize = require('./../db')

class ProductController {
    async getAll(req, res, next) {
        try {
            let { typeId, genderId, limit, page } = req.query
            page = page || 1
            limit = limit || 30
            let offset = limit * page - limit
            let products
            if (!typeId && !genderId) {
                products = await Product.findAndCountAll({include: [{ model: ProductInfo, as: 'info' },
                {model: Images, as: 'images' }
            ], limit, offset })
            }
            if (!typeId && genderId) {
                products = await Product.findAndCountAll({ where: { genderId }, include: [{ model: ProductInfo, as: 'info' },
                {model: Images, as: 'images' }], limit, offset })
            }
            if (typeId && !genderId) {
                products = await Product.findAndCountAll({ where: { typeId }, include: [{ model: ProductInfo, as: 'info' },
                {model: Images, as: 'images' }], limit, offset })
            }
            if (typeId && genderId) {
                products = await Product.findAndCountAll({ where: { typeId, genderId }, include: [{ model: ProductInfo, as: 'info' },
                {model: Images, as: 'images' }], limit, offset })
            }
            return res.json(products)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
    async getOne(req, res) {
        const { id } = req.params
        const product = await Product.findOne(
            {
                where: { id },
                include: [
                    {model: ProductInfo, as: 'info'},
                    {model: Images, as: 'images' }
                ]
            }
        )
        return res.json(product)
    }
    async deleteOne(req, res) {
        const { id } = req.params
        const product = await Product.deleteOne(
            {
                where: { id }
            }
        )
        return res.status(200).json({result: 'succes'})
    }
    async create(req, res, next) {
        try {
            const { name, price, typeId, genderId } = req.body
            //const types = await TypeController.getOneByName(req, res)
            //const genders = await GenderController.getOneByName(req, res)
            //const type = types[0]
            // const gender = genders[0]
            //console.log(type, gender)
            const product = await Product.create({ name, price, typeId, genderId })
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new ProductController()