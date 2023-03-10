import { getAllPosts } from "../repositories/Posts.js";

async function getAllUsersPosts(req, res) {
    try {
        const posts = await getAllPosts();
        return res.status(200).send(posts.rows);
    } catch (_) {
        console.log(_);
        return res.status(500).send("internal server error.");
    }
}

export { getAllUsersPosts };