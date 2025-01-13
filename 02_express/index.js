import express from "express";
// import dotenv from "dotenv"
// dotenv.config();
import 'dotenv/config'
const app =express();
const port =process.env.PORT; // not just using directly issue on deployment
import logger from "./logger.js";
import morgan from "morgan";

const morganFormat = ":method :url :status :response-time ms"; // customized according our requirements

//morgan middle ware
app.use(
    morgan(morganFormat, {
      stream: {
        write: (message) => {
          const logObject = {
            method: message.split(" ")[0],
            url: message.split(" ")[1],
            status: message.split(" ")[2],
            responseTime: message.split(" ")[3],
          };
          logger.info(JSON.stringify(logObject));
        },
      },
    })
  );

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
    // logger.info("This is an info message");
    // logger.error("This is an info message");
    console.log(`Server is running at port ${port}...`)
})