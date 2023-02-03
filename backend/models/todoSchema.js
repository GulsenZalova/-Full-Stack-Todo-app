const { default: mongoose } = require("mongoose");
const Schema=mongoose.Schema


const schema=new Schema({
    text:{
        type:String,
        required:true
    },
    isCompleted: {
        type:Boolean,
        default:false
    },
    isDeleted: {
        type:Boolean,
        default:false
    },
    addDate:{
        type:Date,
        default:Date.now()
    }
})


const todos=mongoose.model("todoSchema",schema)


module.exports={
    todos
}