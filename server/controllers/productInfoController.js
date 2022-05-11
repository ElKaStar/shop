const { ProductInfo } = require("../models/models");
const ApiError = require('../error/apiArror');


class ProductInfoController {
    async create(req, res) {
        const {productId, propertyId, description} = req.body
        const newProdInfo = await ProductInfo.create({productId, propertyId, description})
        return res.json(newProdInfo)
    }
}

module.exports = new ProductInfoController()