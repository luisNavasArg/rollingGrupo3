const { Router } = require("express")
const router = Router()
const usersControllers = require('../controllers/usersControllers')
const {validarCampos} = require('../middlewares/validar_campos')
const {check} = require('express-validator')

router.get("/getUsers", usersControllers.index)
router.get("/getOneUser/:id", [
    check("id", "No es un id Válido").isMongoId(),
    validarCampos
], usersControllers.getOne)
router.put("/updateUser/:id",validarCampos, usersControllers.update)
router.post("/createUser/",validarCampos, usersControllers.create)
router.delete("/deleteUser/:id", usersControllers.del)
router.put("/activeUser/:id",validarCampos, usersControllers.activeUser)

module.exports = router