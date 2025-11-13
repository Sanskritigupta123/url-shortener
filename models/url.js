import mongoose from "mongoose"
import { type } from "os";

const  urlSchema = mongoose.Schema({
    shortId : {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl : {
        type: String,
        required: true,
    },
    visitHistory : [{ timestamp: {type: Number}}],
    createdBy:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
        required : true,
    }
}, {timestamps: true})

export const URL = mongoose.model("url", urlSchema);

