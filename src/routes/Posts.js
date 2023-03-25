import express from "express";

import { editPost, getAllUsersPosts, getUserPosts, removePost } from "../controllers/Posts.js";

import { isUserAuthenticated } from "../middlewares/Authentication.js";
import { verifyIfUserIsOwnerOfPost } from "../middlewares/Posts.js";

import { validateSchema } from "../middlewares/validateSchema.js";
import { postSchema } from '../schemas/postSchema.js';
import { validateToken } from '../middlewares/validateToken.js';
import { dislikePost, likePost, publishPost } from '../controllers/Post.js';
import { verifyIfPostExists } from '../middlewares/Post.js';
import { commentSchema } from '../schemas/postSchema.js';
import { insertNewComment } from '../controllers/Post.js';

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

router.all("/post/:id/update", isUserAuthenticated, verifyIfUserIsOwnerOfPost, async (req, res) => {
    if (req.method === "PATCH") return await editPost(req, res);
    return res.status(405).send("this method is not allowed here");
});

router.post('/post', validateSchema(postSchema), validateToken, publishPost);
router.post('/post/:id/like',validateToken, verifyIfPostExists, likePost);
router.delete('/post/:id/dislike', validateToken, verifyIfPostExists, dislikePost);
router.post('/comment/:id', validateSchema(commentSchema), validateToken, verifyIfPostExists, insertNewComment)

export default router;