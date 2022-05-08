const Router = require('express')
const router = new Router()
const statusesController = require('../controllers/statusesController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/find', statusesController.getOneByTitle)
router.get('/', statusesController.get)
router.post('/', checkRole('ADMIN'), statusesController.create)
router.delete('/delete', statusesController.deleteStatus)

module.exports = router