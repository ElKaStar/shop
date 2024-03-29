const { Cart } = require("../models/models");
const ApiError = require('../error/apiArror');
const sequelize = require('./../db')



class CartController {
    async createNewCart(req, res, next) {
        const { userId, statusId, inCart } = req.body
        if (!userId) {
            return next(ApiError.badRequest(`Id don't mentioned`))
        }
        let statusCurr
        if (!statusId) {
            statusCurr = null
        } else {
            statusCurr =  statusId
        }
        const newCart = await Cart.create({ userId, statusCurr, inCart: true })
        if (!newCart) {
            return res.status(404).json({ data: 'not found' })
        } else {
            return res.json(newCart)
        }
    }
    async getCartByUser(req, res, next) {
        const { userId } = req.query
        console.log('userId', userId)
        if (!userId) {
            return next(ApiError.badRequest(`Id don't mentioned`))
        } else {
            const currCart = await Cart.findOne({
                where: {
                    userId: userId,
                    inCart: true
                }
            })
            if (!currCart) {
                return res.status(204).json({ result: 'not found' })
            }
            return res.json(currCart)
        }
    }
    async changeToOrder(req, res, next) {
        const { cartId } = req.body
        console.log(cartId)
        if (!cartId) {
            return next(ApiError.badRequest(`Id don't mentioned`))
        }
        const [results] = await sequelize.query(
            `UPDATE public.carts
            SET "inCart" = false
            WHERE "id" = :cartId`,
            {
                replacements: { cartId: cartId }
            }
        );
        return res.json(results)
    }
}

module.exports = new CartController()