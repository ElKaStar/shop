const Router = require('express')
const router = new Router()
const imagesController = require('../controllers/imagesController')

router.post('/', imagesController.addToProductId)
router.get('/:id', imagesController.getByProductId)


module.exports = router