const {todos}=require("../models/todoSchema")


const todosController={
    getAll:(req,res)=>{
        todos.find({isDeleted:false},(err,docs)=>{
            if(!err){
                res.json(docs)
            }else{
                res.status(500).json(err)
            }
        })
    },
    getByID:(req,res)=>{
        let id=req.params.id
        todos.findById(id,(err,docs)=>{
            if(!err){
                res.json(docs)
            }else{
                res.status(500).json(err)
            }
        })
    },
    add:(req,res)=>{
        let newToDo=new todos({
            text:req.body.text,
            isCompleted:req.body.isCompleted,
            isDeleted:req.body.isDeleted
        })
        newToDo.save((err,docs)=>{
            if(!err){
                res.json(docs)
            }else{
                res.status(500).json(err)
            }
        })
    },
    delete:(req,res)=>{
        const id=req.params.id
        todos.findById(id,(err,docs)=>{
            if(!err){
                docs.save()
                docs.isDeleted = true;
                res.json(docs)
            }else{
                res.status(500).json(err)
            }
        })
    },
    update:(req,res)=>{
        const id=req.params.id
        todos.findByIdAndUpdate(id,
            {
            _id:id,
            text:req.body.text,
            isCompleted:req.body.isCompleted,
            isDeleted:req.body.isDeleted,
            runValidators:true}
            ,
            {new:true},
            (err,docs)=>{
            if(!err){
                res.json(docs)
                docs.save()
            }else{
                res.status(500).json(err)
            }
        })
    }
}


module.exports={
    todosController
}