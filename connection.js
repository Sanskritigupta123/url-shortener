import mongoose from "mongoose";

export async function connectToDb(url){
    await mongoose.connect(url);
}

