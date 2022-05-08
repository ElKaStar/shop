const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/find', typeController.getOneByName)
router.get('/find-by-id/:id', typeController.getOneById)
router.get('/', typeController.get)
router.post('/', checkRole('ADMIN'), typeController.create) 

module.exports = router