// require('dotenv').config({path:'./env'})  -> type =modeles error
import connectDB from "./db/index.js";
import express from 'express'
import dotenv from "dotenv";
import {app} from './app.js'

dotenv.config({
    path:'./env'
});

connectDB()
.then(()=>{
    app.listen(process.env.PORT ||3000 ,()=>{
        console.log(`Server is running at PORT ${process.env.PORT}`);
    } )
})
.catch((err)=>{
    console.log("DB Connection failed !! ",err);
})