import { deleteLikePost, getPosts, insertLikePost, insertPost } from '../repositories/PostRepositories.js';


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
    const user_id = res.locals.id_user
    const post_id = req.params.id

    try {
        await insertLikePost(user_id, post_id)
        res.sendStatus(201)

    } catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
}

export async function dislikePost(req, res) {
    const user_id = res.locals.id_user
    const post_id = req.params.id

    try {
        await deleteLikePost(user_id, post_id)
        res.sendStatus(204)
        
    } catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
}

export async function getAllPosts(req, res){
    
    try {
        const posts = await getPosts();
        return res.status(200).send(posts)

        
    } catch(error){
        console.log(error);
        return res.status(500).send(error);
    }

}