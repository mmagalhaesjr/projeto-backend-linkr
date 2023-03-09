import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { postSchema } from '../schemas/postSchema.js';
import { validateToken } from '../middlewares/validateToken.js';
import { publishPost } from '../controllers/Post.js';

const postsRoutes = Router();

postsRoutes.post('/post', validateSchema(postSchema), validateToken, publishPost);

export default postsRoutes


