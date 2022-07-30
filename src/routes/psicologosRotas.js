// dependecias
const express = require('express')

// preciso da controller
const controller = require('../controllers/psicologosController')

const router = express.Router()

routes.get('/', (req, res) => {
  res.status(200).send({
    title: 'Projeto Final {reprograma} - Não ando só',
    version: '1.0.0',
});

router.get('/biblioteca', controller.findAllPsicologos)
router.get("/payment", controller.findPsicologosByPayment)
router.get('/:id', controller.findById)
router.post("/create", controller.createPsicologos)
router.patch("/update/:id", controller.updatePsicologo)
router.delete("/delete/:id", controller.deletePsicologo)

module.exports = router
