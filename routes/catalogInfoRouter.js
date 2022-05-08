const Router = require('express')
const router = new Router()
const catalogsInfoController = require('../controllers/catalogsInfoController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/find-new', catalogsInfoController.getNewProductsFrCatalog)
router.get('/find', catalogsInfoController.getProductsFrCatalog)
router.get('/', catalogsInfoController.get)
router.post('/', checkRole('ADMIN'), catalogsInfoController.create)
router.delete('/delete/:id',  checkRole('ADMIN'), catalogsInfoController.delete)

module.exports = router