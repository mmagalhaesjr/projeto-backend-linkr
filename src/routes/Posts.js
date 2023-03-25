import express from "express";

import { getAllUsersPosts, getUserPosts, removePost } from "../controllers/Posts.js";

import { isUserAuthenticated } from "../middlewares/Authentication.js";
import { verifyIfUserIsOwnerOfPost } from "../middlewares/Posts.js";

const router = express.Router();

router.all("/posts", isUserAuthenticated, async (req, res) => {
    if (req.method === "GET") return await getAllUsersPosts(req, res);
    return res.status(405).send("this method is not allowed here");
});

router.all("/user/posts/:id", isUserAuthenticated, async (req, res) => {
    if (req.method === "GET") return await getUserPosts(req, res);
    return res.status(405).send("this method is not allowed here");
});

router.all("/post/:id/delete", isUserAuthenticated, verifyIfUserIsOwnerOfPost, async (req, res) => {
    if (req.method === "DELETE") return await removePost(req, res);
    return res.status(405).send("this method is not allowed here");
});

export default router;