import express from "express";
import { RePost } from "../controllers/RePosts.js";
import { alreadyReposted } from "../middlewares/RePosts.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = express.Router();

router.post('/repost', validateToken, alreadyReposted, RePost);

export default router;