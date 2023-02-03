const express=require("express")
const { default: mongoose } = require("mongoose")
const todoRoute=require("./routes/todoRoutes")
const cors = require("cors");
const { todos } = require("./models/todoSchema");
const app=express()

app.use(cors())

mongoose.connect("mongodb+srv://gulshen:program2022@cluster0.fg9rwde.mongodb.net/todoapp")
    .then(res => {
        console.log('Connect!');
    })
    .catch(err => {
        console.log('err', err);
    })
app.use(express.json());
app.use("/api/todoapp",todoRoute)

// const newtodo = new todos({
//     text:"acassvcd",
//     isCompleted:false,
//     isDeleted:false
// })

// newtodo.save()

app.get('/', function (req, res) {
    res.json("Hello");
})


app.listen(8080);