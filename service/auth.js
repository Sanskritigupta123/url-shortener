import { JsonWebTokenError as jwt } from "jsonwebtoken";
const secret = "Sanskriti123#$";

const sessionIdToUserMap = new Map();

export function setUser(user){
    return jwt.sign({
        _id:user._id,
        name: user.name,
        email: user.email
    }, secret);
    // sessionIdToUserMap.set(id, user);
}

export function getUser(token){
    if(!token){
        return null;
    }
    return jwt.verify(token, secret);
    // return sessionIdToUserMap.get(id);
}