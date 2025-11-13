import {User} from "../models/User.js";
import { setUser, getUser } from "../service/auth.js";
import { set } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export async function handleUserSignup(req, res){
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({error: "All fields are required"});
    }
    await User.create({name, email, password})
    return res.redirect("/");
}

export async function handleUserLogin(req, res){
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({error: "All fields are required"});
    }
    const user = await User.findOne({email, password})
    if(!user){
        return res.rende("login", {error: "Invalid credentials"});
    }
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("sessionId", sessionId);
    return res.redirect("/");
}