const { Property } = require("../models/models");
const ApiError = require('../error/apiArror');


class PropertyController {
    async create(req, res) {
        const {name} = req.body
        const newProperty = await Property.create({name})
        return res.json(newProperty)
    }
    async get(req, res) {
        const properties = await Property.findAll()
        console.log('propCont', properties)
        return res.json(properties)
    }
    async getOneByName(req, res, next) {
        const {property} = req.body
        
        if (!property) {
            return next(ApiError.badRequest(`Id don't mentioned`))
        }
        const properties = await Property.findAll({
            where: {
              name: property
            }
          })
        return properties
    }
}

module.exports = new PropertyController()