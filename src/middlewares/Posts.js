import { getPostFromUser } from "../repositories/Posts.js";

async function verifyIfUserIsOwnerOfPost(req, res, next) {
    const { id } = req.params;
    const result = await getPostFromUser(id, req.authentication.id_user);
    if (result.rows.length === 0) return res.status(401).send("unauthorized to delete this post");
    return next();
}

export { verifyIfUserIsOwnerOfPost };