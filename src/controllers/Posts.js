import {
  deletePostById,
  editPostById,
  getAllPosts,
  getUserPostsById,
} from "../repositories/Posts.js";

async function getAllUsersPosts(req, res) {
    try {
        const posts = await getAllPosts(Number(req.authentication.id_user));
        return res.status(200).send(posts.rows);
    } catch (_) {
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
        return res.status(500).send("internal server error.");
    }
}

async function removePost(req, res) {
  const { id } = req.params;
  await deletePostById(id);
  return res.status(200).send("post deleted successfully.");
}

async function editPost(req, res) {
  const { id } = req.params;
  const { post } = req.body;
  await editPostById(id, post);
  return res.status(200).send("post edited successfully.");
}

export { editPost, getAllUsersPosts, getUserPosts, removePost };
