import { Router } from "express";
import { trendingHashtags } from "../controllers/Hashtags.js";
import { isUserAuthenticated } from "../middlewares/Authentication.js";

const hashtagRouter = Router();

hashtagRouter.get('/hashtag',trendingHashtags);
hashtagRouter.get('/hashtag/:hashtag',isUserAuthenticated)

export default hashtagRouter;
