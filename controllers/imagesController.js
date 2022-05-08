const { Images } = require("../models/models");
const ApiError = require('../error/apiArror');
const uuid = require('uuid')
const path = require('path')
const cloudinary = require('cloudinary')
cloudinary.config({ 
    cloud_name: 'da1qjbkf9', 
    api_key: '124156134784274', 
    api_secret: '6Ltajbxrev0dF77uLTpGOsJLAEg' 
  });


class ImagesController {
    async addToProductId(req, res) {
        const {productId} = req.body
        const {scr} = req.files
        let fileName = uuid.v4() + ".jpg"
        scr.mv(path.resolve(__dirname, '..', 'static', fileName))
        cloudinary.v2.uploader.upload(__dirname, '..', 'static', fileName,
        { public_id: fileName }, 
        function(error, result) {console.log(result); });
        
        const image = await Images.create({productId, scr: fileName})
        return res.json(image)
    }
    async getByProductId(req, res) {
        
    }
}

module.exports = new ImagesController()