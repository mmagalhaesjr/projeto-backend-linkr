import { getUserAndUserPostsById } from "../repositories/Posts.js";

async function getUserAndUserPosts(req, res) {
    try {
        const { id } = req.params;
        if (!id || Number.isNaN(Number(id))) return res.status(401).send("invalid user id format");
        const posts = await getUserAndUserPostsById(id);
        return res.status(200).send(posts);
    } catch(_) {
        return res.status(500).send("internal server error.");
    }
}

export { getUserAndUserPosts };