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