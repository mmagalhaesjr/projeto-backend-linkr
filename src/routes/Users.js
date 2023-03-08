import express from "express";

import { isUserAuthenticated } from "../middlewares/Authentication.js";

const router = express.Router();

router.all("/user/:id", isUserAuthenticated, async (req, res) => {
    if (req.method === "GET") return res.status(200).send("OK");
    return res.status(405).send("this method is not allowed here");
});

export default router;