import joi from "joi";

export const userSchema = joi.object({
    username: joi.string().min(3).max(100).required(),
    email: joi.string().email().regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).required(),
    password: joi.string().min(6).max(30).required(),
    image: joi.string().not('').required()
});