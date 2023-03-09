import { getUserAndUserPostsById } from "../repositories/Posts.js";
import { getUsersByUsername } from "../repositories/Users.js";

async function getUserAndUserPosts(req, res) {
    try {
        const { id } = req.params;
        if (!id || Number.isNaN(Number(id))) return res.status(401).send("invalid user id format");
        const posts = await getUserAndUserPostsById(id);
        return res.status(200).send(posts.rows);
    } catch(_) {
        return res.status(500).send("internal server error.");
    }
}

async function searchUsersByUsername() {
    try {
        const { username } = req.body;
        if (!username || typeof username !== "string") return res.status(401).send("invalid username format");
        const users = await getUsersByUsername(username);
        return res.status(200).send(users.rows);
    } catch (_) {
        return res.status(500).send("internal server error.");
    }
}

export { getUserAndUserPosts, searchUsersByUsername };