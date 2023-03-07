import { Router } from "express";
import { postSignIn, postSignUp } from "../controllers/Sign.js";
import { postSignUpValidation } from "../middlewares/postSignUpValidation.js";
import { postSignInValidation } from "../middlewares/postSignInValidation.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { userSchema } from "../schemas/userSchema.js";

const signRoutes = Router();

signRoutes.post('/sign-up', postSignUpValidation, validateSchema(userSchema), postSignUp);
signRoutes.post('/sign-in', postSignInValidation, postSignIn);

export default signRoutes