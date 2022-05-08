const { Images } = require("../models/models");
const ApiError = require('../error/apiArror');
const uuid = require('uuid')
const path = require('path')


class ImagesController {
    async addToProductId(req, res) {
        const {productId} = req.body
        const {scr} = req.files
        let fileName = uuid.v4() + ".jpg"
        scr.mv(path.resolve(__dirname, 'client', 'build', 'static', fileName))
        const image = await Images.create({productId, scr: fileName})
        return res.json(image)
    }
    async getByProductId(req, res) {
        
    }
}

module.exports = new ImagesController()