const Router = require('express')
const router = new Router()
const cartProductsController = require('../controllers/cartProductsController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/whole-cart', cartProductsController.getCartProductsByCartId)
router.get('/', cartProductsController.getCartProductsByCartIdAndProductId)
router.post('/', cartProductsController.create) 
router.post('/change-cart', cartProductsController.changeQuantity) 
router.post('/get-images', cartProductsController.getImagesforCartProducts) 
router.delete('/delete', cartProductsController.delete) 

module.exports = router


