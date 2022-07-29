// dependecias
const express = require('express')

// preciso da controller
const controller = require('../controllers/psicologosController')

const router = express.Router()

router.get('/biblioteca',      controller.findAllPsicologos)
router.get("/payment", controller.findPsicologosByPayment)
router.get('/:id', controller.findById)
router.post("/create", controller.createPsicologos)

module.exports = router