import express from "express";

import { getUserById, searchUsersByUsername } from "../controllers/Users.js";
import { isUserAuthenticated } from "../middlewares/Authentication.js";

const router = express.Router();

router.all("/user/:id", isUserAuthenticated, async (req, res) => {
    if (req.method === "GET") return await getUserById(req, res);
    return res.status(405).send("this method is not allowed here");
});

router.all("/search", isUserAuthenticated, async (req, res) => {
    if (req.method === "POST") return await searchUsersByUsername(req, res);
    return res.status(405).send("this method is not allowed here");
});

export default router;