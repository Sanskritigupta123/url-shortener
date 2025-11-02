import express from "express"
import {generateNewShortUrl, getAnalytics, redirectUser} from "../controllers/url.js"

const router = express.Router();

router.post("/", generateNewShortUrl);
router.get("/analytics/:shortId", getAnalytics);
router.get("/:shortId", redirectUser);

export { router };  