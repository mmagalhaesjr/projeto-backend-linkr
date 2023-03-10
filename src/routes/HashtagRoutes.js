import { Router } from "express";
import { listHashtags, trendingHashtags } from "../controllers/Hashtags.js";
import { isUserAuthenticated } from "../middlewares/Authentication.js";

const hashtagRouter = Router();

hashtagRouter.get('/hashtag',isUserAuthenticated,trendingHashtags);
hashtagRouter.get('/hashtag/:hashtag',isUserAuthenticated,listHashtags)

export default hashtagRouter;
