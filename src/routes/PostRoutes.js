import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { postSchema } from '../schemas/postSchema.js';
import { validateToken } from '../middlewares/validateToken.js';
import { dislikePost, getAllPosts, likePost, publishPost } from '../controllers/Post.js';
import { verifyIfPostExists } from '../middlewares/Post.js';

const postsRoutes = Router();

postsRoutes.post('/post', validateSchema(postSchema), validateToken, publishPost);
postsRoutes.post('/post/:id/like',validateToken, verifyIfPostExists, likePost);
postsRoutes.delete('/post/:id/dislike', validateToken, verifyIfPostExists, dislikePost);
postsRoutes.get('/posts', getAllPosts)

export default postsRoutes


