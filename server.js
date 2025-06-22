import express from "express"
import "dotenv/config"

const PORT=  process.env.Port || 4000
const app =express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.json({ 
    status:200,
    message: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});