import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { postSchema } from '../schemas/postSchema.js';
import { validateToken } from '../middlewares/validateToken.js';
import { countPostsById, dislikePost, getAllPosts, likePost, publishPost } from '../controllers/Post.js';
import { verifyIfPostExists } from '../middlewares/Post.js';
import { commentSchema } from '../schemas/postSchema.js';
import { insertNewComment } from '../controllers/Post.js';

const PostsRoutes = Router();

PostsRoutes.post('/post', validateSchema(postSchema), validateToken, publishPost);
PostsRoutes.post('/post/:id/like',validateToken, verifyIfPostExists, likePost);
PostsRoutes.delete('/post/:id/dislike', validateToken, verifyIfPostExists, dislikePost);
PostsRoutes.get('/posts', getAllPosts);
PostsRoutes.post('/comment/:id', validateSchema(commentSchema), validateToken, verifyIfPostExists, insertNewComment);
PostsRoutes.get('/count-posts',validateToken,countPostsById);

export default PostsRoutes