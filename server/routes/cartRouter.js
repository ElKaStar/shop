const Router = require('express')
const router = new Router()
const cartController = require('../controllers/cartController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', cartController.getCartByUser)
router.post('/send', cartController.changeToOrder)
router.post('/', cartController.createNewCart)

module.exports = router