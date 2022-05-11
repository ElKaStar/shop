const { CatalogsInfo } = require("../models/models");
const ApiError = require('../error/apiArror');
const sequelize = require('./../db');
const uuid = require('uuid')
const path = require('path')

class CatalogsInfoController {
    async create(req, res) {
        const {description, catalogId, productId} = req.body
        const catalogs = await CatalogsInfo.create({description, catalogId, productId})
        return res.json(catalogs)
    }
    async get(req, res) {
        const catalogsInfo = await CatalogsInfo.findAll()
        return res.json(catalogsInfo)
    }
    async delete(req, res) {
        const { id } = req.params
        const product = await CatalogsInfo.deleteOne(
            {
                where: { id }
            }
        )
        return res.status(200).json({result: 'succes'})
    }
    async getProductsFrCatalog(req, res, next) {
        const {catalogId} = req.query
        console.log(catalogId)
        if (!catalogId) {
            return next(ApiError.badRequest(`Id don't mentioned`))
        }
        const [results] = await sequelize.query(
        `select products.id as id, products.name as name, products.price as price
        from public.catalogs_infos 
        left join public.products ON ("productId" = products.id)
        where "catalogId" = :catalogId`,
        {
            replacements: { catalogId:  catalogId}
          }
         );
         if (!results) {
            return res.status(204).json({ data: 'not found' })
        } else {
            return res.json(results)
        }
    }
    async getNewProductsFrCatalog(req, res, next) {
        const [results] = await sequelize.query(
        `drop table if exists new_prods;
        CREATE TEMP TABLE new_prods AS
        select products.id as id, products.name as name, products.price as price
        from public.catalogs
        left join public.catalogs_infos ON (catalogs.id = "catalogId")
        inner join public.products on ("productId" = products.id)
        where "isNew" = true;
        select new_prods.id as id, new_prods.name as name, new_prods.price as price, images.scr as scr
        from new_prods
        left join public.images on (new_prods.id = "productId")
        Order by new_prods.id;`
         );
       if (!results) {
            return res.status(204).json({data: 'not found'})
       } else {
        return res.json(results)
       }
    }

}

module.exports = new CatalogsInfoController()