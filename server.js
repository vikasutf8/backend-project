import express from "express"
import "dotenv/config"
import apiRoute from "./routes/api.js"
import fileUpload from "express-fileupload";
import helmet from "helmet";
import cors from "cors";
import { limiter } from "./config/rateLimiter.js";
import logger from "./config/logger.js";
const PORT=  process.env.Port || 4000
const app =express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(
  {
    origin :"*",

  }
));
app.use(helmet());
app.use(limiter)
app.use(fileUpload());
app.use(express.static("public")) // as any data present in public folder should be served as GET like as image localhost+path+name is urls 
app.use("/api/v1",apiRoute)

app.get("/", (req, res) => {
  res.json({ 
    status:200,
    message: "Hello World" });
});

//logger
logger.info("Server is running on port 4000");

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});