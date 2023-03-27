import { getUserAndUserPostsById } from "../repositories/Posts.js";
import { getUsersByUsername, findUserById, getUserInfo, verifyIsFollowingUser, setFollowUser, setUnfollowUser } from "../repositories/Users.js";

async function getUserById(req, res) {
    try {
        const { id } = req.params;
        if (!id || Number.isNaN(Number(id))) return res.status(401).send("invalid user id format");
        const user = await findUserById(Number(req.authentication.id_user), id);
        if (user.rows.length === 0) return res.status(400).send("user not found");
        else return res.status(200).send(user.rows[0]);
    } catch (_) {
        return res.status(500).send("internal server error.");
    }
}

async function searchUsersByUsername(req, res) {
    try {
        const { username } = req.body;
        if (!username || typeof username !== "string") return res.status(401).send("invalid username format");
        const users = await getUsersByUsername(Number(req.authentication.id_user), username);
        return res.status(200).send(users.rows);
    } catch (_) {
        return res.status(500).send("internal server error.");
    }
}

async function getUserMe(req, res) {
    try {
        const id = res.locals.id_user;
        
        const myInfo = await getUserInfo(id)
        
        return res.status(200).send(myInfo.rows[0]);
    } catch (_) {
        return res.status(500).send("internal server error.");
    }
}

async function followUser(req, res) {
    const { id } = req.params;

    if (Number.isNaN(Number(id))) return res.status(400).send("invalid user id");

    if (Number(id) === Number(req.authentication.id_user)) return res.status(400).send("you cannot follow yourself");

    const isFollowingResult = await verifyIsFollowingUser(Number(req.authentication.id_user), Number(id));
    if(isFollowingResult.rows.length > 0) return res.status(200).send("you already following this user.");

    await setFollowUser(Number(req.authentication.id_user), Number(id));
    return res.status(200).send("follow user successfully.");
}

async function unfollowUser(req, res) {
    const { id } = req.params;

    if (Number.isNaN(Number(id))) return res.status(400).send("invalid user id");

    if (Number(id) === Number(req.authentication.id_user)) return res.status(400).send("you cannot unfollow yourself");

    await setUnfollowUser(Number(req.authentication.id_user), Number(id));
    return res.status(200).send("unfollow user successfully.");
}

export { followUser, getUserById, getUserMe, searchUsersByUsername, unfollowUser };
