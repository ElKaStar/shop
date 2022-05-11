const { Statuses } = require("../models/models");
const ApiError = require('../error/apiArror');
const sequelize = require('./../db')



class StatusesController {
    async create(req, res) {
        const {title} = req.body
        const status = await Statuses.create({title})
        return res.json(status)
    }
    async get(req, res) {
        const statuses = await Statuses.findAll()
        return res.json(statuses)
    }
    async getOneByTitle(req, res, next) {
        const {title} = req.query
        if (!title) {
            return next(ApiError.badRequest(`Id don't mentioned`))
        }
        const status = await Statuses.findAll({
            where: {
                title: title
            }
          })
          //console.log(genders)  
        return status
    }
    async deleteStatus(req, res, next) {
        const { id } = req.query
        if (!id) {
            return next(ApiError.badRequest(`Id don't mentioned`))
        }
        const statuses = await Statuses.deleteOne(
            {
                where: { id }
            }
        )
       return res.json(results)
    }
}

module.exports = new StatusesController()