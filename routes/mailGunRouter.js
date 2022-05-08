const Router = require('express')
const router = new Router()
const mailGunController = require('../controllers/mailGunController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/send', mailGunController.sendTestEmail)



module.exports = router