import { deleteLikePost, getPosts, insertComment, insertLikePost, insertPost, getReposts } from '../repositories/PostRepositories.js';


export async function publishPost(req, res) {
    const id_user = res.locals.id_user
    const { url, description } = req.body

    try {
        await insertPost(id_user, url, description)
        res.sendStatus(201)
        

    } catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
}


export async function likePost(req, res) {
    const id_user = res.locals.id_user
    const id_post = req.params.id

    try {
        await insertLikePost(id_user, id_post)
        res.sendStatus(201)

    } catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
}

export async function dislikePost(req, res) {
    const id_user = res.locals.id_user
    const id_post = req.params.id

    try {
        await deleteLikePost(id_user, id_post)
        res.sendStatus(204)
        
    } catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
}

export async function getAllPosts(req, res){
    
    try {
        const posts = await getPosts();
        const reposts = await getReposts();

        let postWithRepost = [];
        for(let i = 0; i < reposts.rows.length; i++){
            let repost = reposts.rows[i];
            
            for (let x = 0; x < posts.rows.length; x++){
                let post = posts.rows[x];
                if (post.id === repost.id_post){
                    postWithRepost.push({ id:post.id, 
                        post: post.post, 
                        post_url: post.post_url, 
                        post_date: repost.createdAt, 
                        post_user_id: post.post_user_id,
                        username: post.username, 
                        user_image: post.user_image, 
                        likes: post.likes, 
                        id_liked: post.id_liked, 
                        names_liked: post.names_liked, 
                        comments_count: post.comments_count,
                        allcomments: post.allcomments,
                        reposts: post.reposts,
                        repostedById: repost.id_user,
                        repostedByName: repost.username
                    })
                }
            }
        }

        let results = postWithRepost.concat(posts.rows)

        results.sort(function(a, b) {
            return new Date(b.post_date) - new Date(a.post_date);
          });

        return res.status(200).send(results.slice(0, 20))

        
    } catch(error){
        console.log(error);
        return res.status(500).send(error);
    }

}

export async function insertNewComment(req, res) {
    const id_user = res.locals.id_user
    const id_post = req.params.id
    const { comment } = req.body

    try {
        await insertComment(comment, id_user, id_post)
        res.sendStatus(201)

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

