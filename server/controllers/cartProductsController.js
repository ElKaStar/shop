const { CartProducts } = require("../models/models");
const ApiError = require('../error/apiArror');
const sequelize = require('./../db')



class CartProductsController {
    async create(req, res) {
        const { cartId, productId, price, quantity } = req.body
        const cartProduct = await CartProducts.create({ cartId, productId, price, quantity })
        return res.json(cartProduct)
    }
    async getCartProductsByCartIdAndProductId(req, res, next) {
        const { cartId, productId } = req.query
        if (!cartId || !productId) {
            return next(ApiError.badRequest(`Id don't mentioned`))
        }
        const currCartProduct = await CartProducts.findAll({
            where: {
                cartId: cartId,
                productId: productId
            }
        })
        return res.json(currCartProduct)
    }
    async getCartProductsByCartId(req, res, next) {

        const { cartId } = req.query
        console.log('getCart',)
        if (!cartId) {
            return next(ApiError.badRequest(`Id don't mentioned`))
        }
        const [results] = await sequelize.query(
            `drop table if exists new_prods;
            CREATE TEMP TABLE new_prods AS
            select "statusId" as statusId, "productId" as prodId, "quantity" as quantity, cart_products.price as price, products.name as name, cart_products.id as cartProductId 
            from public.carts
            inner join public.cart_products on (carts.id = "cartId")
            left join public.products on ("productId" = products.id)
            where carts.id = :cartId;
                        
            Select max(scr) as scr, new_prods.statusId as statusId, new_prods.prodId as productId, new_prods.quantity as quantity, new_prods.price as price, new_prods.name as name, new_prods.cartProductId as cartProductId  
            from new_prods
            left join public.images 
            on (new_prods.prodId = "productId")
            GROUP BY new_prods.statusId, new_prods.prodId, new_prods.quantity, new_prods.price, new_prods.name, new_prods.cartProductId
            ORDER BY new_prods.cartProductId`,
            {
                replacements: { cartId: cartId }
            }
        )
        if (!results) {
            return res.status(204).json({ data: 'not found' })
        } else {
            return res.json(results)
        }
    }
    async getImagesforCartProducts(req, res, next) {
        const { productsIds } = req.body
        if (!productsIds) {
            return next(ApiError.badRequest(`Id don't mentioned`))
        }
        const [results] = await sequelize.query(
            `select max(scr) as scr, "productId" 
            from public.images
            where "productId" IN (:productsIds)
            Group by "productId"`,
            {
                replacements: { productsIds: productsIds }
            }
        )
        if (!results) {
            return res.status(204).json({ data: 'not found' })
        } else {
            return res.json(results)
        }
    }
    async delete(req, res) {
        try {
            const { cartId, productId } = req.query
            const [results] = await sequelize.query(
                `DELETE FROM public.cart_products
            WHERE "productId" = :productId and "cartId" = :cartId`,
                {
                    replacements: { productId: productId, cartId: cartId }
                }
            )
            return res.status(200).json({ result: 'succes' })
        } catch (err) {
            throw err
        }
    }
    async changeQuantity(req, res) {
        try {
            const { cartId, productId, quantity } = req.body
            if (!cartId || !productId || !quantity) {
                return next(ApiError.badRequest(`Id don't mentioned`))
            }
            const [results] = await sequelize.query(
                `UPDATE public.cart_products
            SET quantity = :quantity
            WHERE "productId" = :productId and "cartId" = :cartId`,
                {
                    replacements: { productId: productId, cartId: cartId, quantity: quantity }
                }
            )
            return res.status(200).json({ result: 'succes' })
        } catch (err) {
            throw err
        }
    }
}

module.exports = new CartProductsController()