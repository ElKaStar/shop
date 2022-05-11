const { Catalogs } = require("../models/models");
const ApiError = require('../error/apiArror');
const sequelize = require('./../db');


class CatalogsController {
    async create(req, res) {
        const {name, scr} = req.body
        let isNew
        if (!name) {
            return next(ApiError.badRequest(`Id don't mentioned`))
        }
        if (name === 'New') {
            isNew = true
        } else {
            isNew = false
        }
        const catalogs = await Catalogs.create({name, isNew, scr})
        return res.json(catalogs)
    }
    async get(req, res) {
        const catalogs = await Catalogs.findAll()
        return res.json(catalogs)
    }
    async delete(req, res) {
        const { id } = req.params
        const product = await Catalogs.deleteOne(
            {
                where: { id }
            }
        )
        return res.status(200).json({result: 'succes'})
    }
}

module.exports = new CatalogsController()