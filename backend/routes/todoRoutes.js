
const express=require("express")
const {todosController}=require("../controller/todoController")
const router=express.Router()

router.get("/",todosController.getAll)
router.get("/:id",todosController.getByID)
router.post("/",todosController.add)
router.delete("/:id",todosController.delete)
router.put("/:id",todosController.update)

module.exports=router