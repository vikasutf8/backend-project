import express from "express";

const app =express();
const port =3000;


// app.get("/",(req,res)=>{
//     res.send("Hello it Express framework with Get request")
//     res.end();
// })
// app.get("/test",(req,res)=>{
//     res.send("Anohtera  it Express framework with Get request#2")
//     res.end();
// })

// now we have to accept data from borwoser ..
app.use(express.json()) //any data in json
app.use(express.urlencoded())

let teaData =[]
let nextId =1;
//curd all
app.post("/teas",(req,res)=>{
    const {name,price} =req.body
    const newTea ={
        id :nextId++,
        name,
        price
    }
    teaData.push(newTea)

    res.status(201).send({
        message :"post on data",
        data :newTea
    })
})
app.get("/teas",(req,res)=>{
    res.send({
        status :201,
        data :teaData
    })
})
app.get("/teas/:id",(req,res)=>{
    //find in array  -- find()
    const tea = teaData.find(it =>{
        it.id === parseInt(req.params.id)
    })
    if(!tea){
        return res.status(400).send("Not found tea")
    }
    res.status(201).send({data : tea});
})

app.listen(port,()=>{
    console.log(`Server is running at port ${port}...`)
})