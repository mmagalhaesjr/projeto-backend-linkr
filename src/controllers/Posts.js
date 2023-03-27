
import { deletePostById, editPostById, getAllPosts, getUserPostsById, getReposts, getMyFollows, deleteComments, deleteLikes, deleteReposts } from "../repositories/Posts.js";

async function getAllUsersPosts(req, res) {
    const id = res.locals.id_user;

    try {
        const posts = await getAllPosts();
        const reposts = await getReposts(id)

        let postWithReposts = [];

        for (let i = 0; i < reposts.rows.length; i++) {
            let repost = reposts.rows[i];

            for (let x = 0; x < posts.rows.length; x++) {
                let post = posts.rows[x];
                if (post.id === repost.id_post) {
                    postWithReposts.push({
                        id: post.id,
                        post: post.post,
                        post_url: post.post_url,
                        post_date: repost.createdAt,
                        id_user: post.id_user,
                        username: post.username,
                        user_image: post.user_image,
                        likes: post.likes,
                        id_liked: post.id_liked,
                        names_liked: post.names_liked,
                        comments_count: post.comments_count,
                        allcomments: post.allcomments,
                        reposts: post.reposts,
                        isReposted: true,
                        repostedById: repost.id_user,
                        repostedByName: repost.username
                    })
                }
            }
        }

        const myFollows = await getMyFollows(id);

        let results = postWithReposts.concat(posts.rows);
        
        let newResults = [];
        
        if (myFollows.rowCount === 0) {
            
            for (let r = 0; r < results.length; r++) {
                if ((Number(results[r].id_user) === Number(id)) || (results[r].isReposted && Number(results[r].repostedById) === Number(id)) || (results[r].id_user === Number(id) && results[r].isReposted)) {
                    newResults.push(results[r]);
                }
            }

        } else {
            
            for (let j = 0; j < myFollows.rows.length; j++) {
                let idIFollow = myFollows.rows[j];

                for (let z = 0; z < results.length; z++) {

                    if (Number(results[z].id_user) === Number(idIFollow.id_followed_user) || (Number(results[z].id_user) === Number(id)) || (results[z].isReposted && Number(results[z].repostedById) === Number(idIFollow.id_followed_user)) || (results[z].isReposted && Number(results[z].repostedById) === Number(id)) || (results[z].id_user === Number(id) && results[z].isReposted && Number(results[z].repostedById) === Number(idIFollow.id_followed_user))) {
                        newResults.push(results[z]);
                    }
                }

            }

        }

        newResults.sort(function (a, b) {
            return new Date(b.post_date) - new Date(a.post_date);
        });

        return res.status(200).send(newResults)


    } catch (error) {
        console.log(error)
        return res.status(500).send("internal server error.");
    }
}

async function getUserPosts(req, res) {
    try {
        const { id } = req.params;
        if (!id || Number.isNaN(Number(id))) return res.status(401).send("invalid user id format");
        const posts = await getUserPostsById(id);
        return res.status(200).send(posts.rows);
    } catch (_) {
        return res.status(500).send("internal server error.");
    }
}

async function removePost(req, res) {

    const { id } = req.params;

    await deleteLikes(id);
    await deleteComments(id);
    await deleteReposts(id);
    
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
