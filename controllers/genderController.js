const { Gender } = require("../models/models");
const ApiError = require('../error/apiArror');
const sequelize = require('./../db')



class GenderController {
    async create(req, res) {
        const {name} = req.body
        const genderProduct = await Gender.create({name})
        return res.json(genderProduct)
    }
    async get(req, res) {
        const genders = await Gender.findAll()
        return res.json(genders)
    }
    async getOneByName(req, res, next) {
        const {gender} = req.query
        if (!gender) {
            return next(ApiError.badRequest(`Id don't mentioned`))
        }
        const genders = await Gender.findAll({
            where: {
              name: gender
            }
          })
          //console.log(genders)  
        return genders
    }
    async getByGender(req, res, next) {
        const {gender} = req.query
        console.log(gender)
        if (!gender) {
            return next(ApiError.badRequest(`Id don't mentioned`))
        }
        console.log('here')
        const [results] = await sequelize.query("select * from public.genders Where id = :genderId",
        {
            replacements: { genderId:  gender}
          }
         );
        console.log(results)
       return res.json(results)
    }
}

module.exports = new GenderController()