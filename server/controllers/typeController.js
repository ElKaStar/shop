const { Type } = require("../models/models");
const ApiError = require('../error/apiArror');


class TypeController {
    async create(req, res) {
        const {name} = req.body
        const typeProduct = await Type.create({name})
        return res.json(typeProduct)
    }
    async get(req, res) {
        console.log('here getAlltypes')
        const types = await Type.findAll()
        return res.json(types)
    }
    async getOneById(req, res) {
        const { id } = req.params
        if (!id) {
            return next(ApiError.badRequest(`Id don't mentioned`))
        }
        const types = await Type.findOne({
            where: {
                id: id
              }
        })
        return res.json(types)
    }
    async getOneByName(req, res, next) {
        const {type} = req.body
        
        if (!type) {
            return next(ApiError.badRequest(`Id don't mentioned`))
        }
        const types = await Type.findAll({
            where: {
              name: type
            }
          })
        return types
    }
}

module.exports = new TypeController()