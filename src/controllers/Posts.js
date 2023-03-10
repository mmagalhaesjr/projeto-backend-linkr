import { getAllPosts, getUserPostsById } from "../repositories/Posts.js";

async function getAllUsersPosts(req, res) {
    try {
        const posts = await getAllPosts();
        return res.status(200).send(posts.rows);
    } catch (_) {
        console.log(_);
        return res.status(500).send("internal server error.");
    }
}

async function getUserPosts(req, res) {
    try {
        const { id } = req.params;
        if (!id || Number.isNaN(Number(id))) return res.status(401).send("invalid user id format");
        const posts = await getUserPostsById(id);
        return res.status(200).send(posts.rows);
    } catch(_) {
        console.log(_);
        return res.status(500).send("internal server error.");
    }
}

export { getAllUsersPosts, getUserPosts };