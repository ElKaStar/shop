const { Images } = require("../models/models");
const ApiError = require('../error/apiArror');
const uuid = require('uuid')
const path = require('path')

class ImagesController {
    async addToProductId(req, res) {
        const {productId, scr} = req.body
        
        const image = await Images.create({productId, scr})
        return res.json(image)
    }
    async getByProductId(req, res) {
        
    }
}

module.exports = new ImagesController()