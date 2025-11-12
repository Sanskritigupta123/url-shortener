import express from "express";
import {router} from "./routes/url.js"
import {connectToDb} from "./connection.js"
import path from "path";
import { URL } from "./models/url.js";
import staticRoute from "./routes/staticRouter.js"

const app = express();
const PORT = 8001;
connectToDb("mongodb://localhost:27017/myDb").then(()=>console.log("mongodb is on"))
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get("/test", async (req, res)=>{
    const allUrls = await URL.find({});
    return res.render("home", {
        urls: allUrls
    });
})

app.use("/", staticRoute);
app.use("/url", router);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}!`)
})