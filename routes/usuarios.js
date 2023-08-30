const { Router } = require("express")
const router = Router()
const usersControllers = require('../controllers/usersControllers')

router.get("/getUsers", usersControllers.index)
router.get("/getOneUser/:id", usersControllers.getOne)
router.put("/updateUser/:id", usersControllers.update)
router.post("/createUser/", usersControllers.create)
router.delete("/deleteUser/:id", usersControllers.del)
router.put("/activeUser/:id", usersControllers.activeUser)

module.exports = router