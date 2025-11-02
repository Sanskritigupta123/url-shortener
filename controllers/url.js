import { nanoid } from "nanoid";
import {URL} from "../models/url.js"

export async function generateNewShortUrl(req, res){
    const body = req.body;
    console.log("------------", req.body)
    if(!body.url){
        return res.status(400).json({error: "url is required"})
    }
    const sId = nanoid(8);
    await URL.create({
        shortId: sId,
        redirectUrl: body.url,
        visitHistory: []
    })
    return res.json({shortID: sId})
}
