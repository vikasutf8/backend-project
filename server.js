import express from "express"
import "dotenv/config"
import apiRoute from "./routes/api.js"
import fileUpload from "express-fileupload";
const PORT=  process.env.Port || 4000
const app =express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use("/api/v1",apiRoute)

app.get("/", (req, res) => {
  res.json({ 
    status:200,
    message: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});