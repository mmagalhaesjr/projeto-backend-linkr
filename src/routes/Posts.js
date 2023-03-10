import express from "express";

import { getAllUsersPosts, getUserPosts } from "../controllers/Posts.js";
import { isUserAuthenticated } from "../middlewares/Authentication.js";

const router = express.Router();

router.all("/posts", isUserAuthenticated, async (req, res) => {
    if (req.method === "GET") return await getAllUsersPosts(req, res);
    return res.status(405).send("this method is not allowed here");
});

router.all("/user/posts/:id", isUserAuthenticated, async (req, res) => {
    if (req.method === "GET") return await getUserPosts(req, res);
    return res.status(405).send("this method is not allowed here");
});

export default router;