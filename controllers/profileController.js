const { Profile } = require("../models/models");
const ApiError = require('../error/apiArror');
const sequelize = require('./../db')



class ProfileController {
    async create(req, res) {
        const {firstName, secondName, address, phone, userId} = req.body
        const profile = await Profile.create({firstName, secondName, address, phone, userId})
        return res.json(profile)
    }
    async get(req, res) {
        const profile = await Profile.findAll()
        return res.json(profile)
    } 
    async getOrders(req, res) {
        const { id } = req.params
        console.log('getOrders', id)
        if (!id) {
            return next(ApiError.badRequest(`Id don't mentioned`))
        }
        const [results] = await sequelize.query(
            `select "statusId", "quantity", products.price, "cartId", "productId", "name" 
            from public.carts
            inner join public.cart_products on (carts.id = "cartId")
            left join public.products on ("productId" = products.id)
            where "inCart" = false and "userId" = :id
            ORDER BY "cartId"`,
            {
                replacements: { id}
            }
        )
        return res.json(results)
    }
}

module.exports = new ProfileController()