import { getUserAndUserPostsById } from "../repositories/Posts.js";
import { getUsersByUsername, getUserSession, getUserInfo } from "../repositories/Users.js";

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

async function getUserMe(req, res) {
    try {
        const id = res.locals.id_user;
        console.log(id)
        const myInfo = await getUserInfo(id)
        console.log(myInfo.rows[0])
        return res.status(200).send(myInfo.rows[0]);
    } catch (err) {
        console.log(err)
        return res.status(500).send("internal server error.");
    }
}

export { getUserAndUserPosts, searchUsersByUsername, getUserMe };