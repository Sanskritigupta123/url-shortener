// import { JsonWebTokenError as jwt } from "jsonwebtoken";
// const secret = "Sanskriti123#$";

const sessionIdToUserMap = new Map();

export function setUser(id, user){
    // return jwt.sign(user, secret, { expiresIn: '1h' });
    sessionIdToUserMap.set(id, user);
}

export function getUser(id){
    // return jwt.verify(token, secret);
    return sessionIdToUserMap.get(id);
}