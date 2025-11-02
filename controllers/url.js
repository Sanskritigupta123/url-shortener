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

export async function getAnalytics(req, res){
    const sId = req.params.shortID;
    const result = await URL.findOne({ sId});
    return res.json({totalClicks: result.visitHistory.length, visitHistory: result.visitHistory})
}

export async function redirectUser(req, res){
    const sId = req.params.shortId;
    console.log("-=-=-=",sId);
    const result = await URL.findOneAndUpdate({
        shortId : sId,
    },
    {
        $push: {visitHistory: {timestamp: Date.now()}}
    });
    res.redirect(result.redirectUrl);
}