import { getUser } from "../service/auth.js";

export async function restrictToAuthenticated(req, res, next) {
    const uuid = req.cookies.sessionId; 
    const user = getUser(uuid);
    if (!uuid || !user) {
        return res.redirect("/login");
    }
    req.user = user;
    next();
}

export function autho(req, res, next) {
    const uid = req.headers["authorization"];
    req.user = null;
    if(!uid) {
        return next();
    }
    const token = uid.split("Bearer ")[1];
    const user = getUser(token)
    req.user = user;
    next();
}