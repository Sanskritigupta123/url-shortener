import express from "express";
import {connectToDb} from "./connection.js"
import path from "path";
import { URL } from "./models/url.js";
import {router} from "./routes/url.js"
import staticRoute from "./routes/staticRouter.js"
import UserRoute from "./routes/user.js"
import cookieParser from "cookie-parser";
import {restrictToAuthenticated} from "./middleware/auth.js"

const app = express();
const PORT = 8001;
connectToDb("mongodb://localhost:27017/myDb").then(()=>console.log("mongodb is on"))
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

app.get("/test", async (req, res)=>{
    const allUrls = await URL.find({});
    return res.render("home", {
        urls: allUrls
    });
})

app.use("/", staticRoute);
app.use("/url",restrictToAuthenticated, router);
app.use("/user", UserRoute);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}!`)
})