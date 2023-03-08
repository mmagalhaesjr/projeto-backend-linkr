import express from "express";

const router = express.Router();

router.all("*", (req, res) => {
    return res.status(404).send("route not found in server API");
});

export default router;