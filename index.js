import express from "express";
import {router} from "./routes/url.js"
import {connectToDb} from "./connection.js"

const app = express();
const PORT = 8001;
connectToDb("mongodb://localhost:27017/myDb").then(()=>console.log("mongodb is on"))

app.use(express.json());

app.use("/url", router);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}!`)
})