const Router = require('express')
const router = new Router()
const profileController = require('../controllers/profileController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/orders/:id', profileController.getOrders)
router.post('/', profileController.create)
router.get('/', profileController.get)

module.exports = router