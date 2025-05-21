import express from "express";
import { connectDB } from "./config/db.js";
import cookieParser from 'cookie-parser';
import { apiRouter } from "./routes/index.js";
import cors from "cors"

connectDB()
const app=express();
app.use(express.json())
app.use(
  cors({
      origin: ["http://localhost:5173","https://findm55ypet.co.in"] ,
      credentials: true,
      methods: ["GET","POST","PUT","DELETE"]
  })
);
app.use(cookieParser());



const port = 3000



app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
    console.log(`app listening on port ${port}`)
    // console.log(process.env.MONGO_URI);
    
    
  })
  app.use('/',apiRouter)



  app.all("*", (req, res) => {
    res.status(404).json({ message: "end point does not exist" });
  });