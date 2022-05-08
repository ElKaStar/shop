const { Catalogs } = require("../models/models");
const ApiError = require('../error/apiArror');
const sequelize = require('./../db');
const uuid = require('uuid')
const path = require('path')

class CatalogsController {
    async create(req, res) {
        const {name, isNew} = req.body
        const {scr} = req.files
        let fileName = uuid.v4() + ".jpg"
        scr.mv(path.resolve(__dirname, '..', 'static', fileName))
        const catalogs = await Catalogs.create({name, isNew, scr: fileName})
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