const {Router} = require ("express")
const router = Router()

router.post("/login", (req, res)=>{
    res.status(201).json({msg:"Peticion a auth post"})
})

module.exports = router; 