import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { postSchema } from '../schemas/postSchema.js';
import { validateToken } from '../middlewares/validateToken.js';
import { dislikePost, getAllPosts, likePost, publishPost } from '../controllers/Post.js';

const postsRoutes = Router();

postsRoutes.post('/post', validateSchema(postSchema), validateToken, publishPost);
postsRoutes.post('/post/:id/like', validateToken, likePost);
postsRoutes.delete('/post/:id/dislike', validateToken, dislikePost);
postsRoutes.get('/posts', validateToken, getAllPosts)

export default postsRoutes


