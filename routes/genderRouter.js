const Router = require('express')
const router = new Router()
const genderController = require('../controllers/genderController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/find', genderController.getOneByName)
router.get('/', genderController.get)
router.post('/', checkRole('ADMIN'), genderController.create)
router.get('/bygender', genderController.getByGender)

module.exports = router