import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

// data aaye ga ->json form ,api/url form ,forms,files->multer,    different ways
app.use(express.json({
    limit: '16kb',
}))
app.use(express.urlencoded({
    extended: true,
    limit: '16kb',
}))
app.use(express.static("public"))
app.use(cookieParser());


// routes
import userRouter from './routes/user.route.js'


app.use("/api/v1/users",userRouter)
// http://localhost:4000/api/v1/users/register



export { app }