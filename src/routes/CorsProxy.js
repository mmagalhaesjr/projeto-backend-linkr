import express from "express";

import { urlFetch } from "../controllers/CorsProxy.js";

const router = express.Router();

router.all("/url_fetch", async (req, res) => {
    if (req.method === "POST") return await urlFetch(req, res);
    return res.status(405).send("this method is not allowed here");
});

export default router;