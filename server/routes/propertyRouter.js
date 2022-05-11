const Router = require('express')
const router = new Router()
const propertyController = require('../controllers/propertyController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', propertyController.get)
router.post('/', checkRole('ADMIN'), propertyController.create)
router.get('/find', propertyController.getOneByName)

module.exports = router