const Router = require('express')
const router = new Router()
const catalogController = require('../controllers/catalogController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', catalogController.get)
router.post('/', checkRole('ADMIN'), catalogController.create)

module.exports = router