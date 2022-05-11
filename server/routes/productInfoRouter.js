const Router = require('express')
const router = new Router()
const productInfoController = require('../controllers/productInfoController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), productInfoController.create)

module.exports = router