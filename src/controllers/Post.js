import { countPosts, deleteLikePost, insertComment, insertLikePost, insertPost } from '../repositories/PostRepositories.js';


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


export async function countPostsById(req,res){
    const id_user = res.locals.id_user
    try {
        const {rows:result} = await countPosts(id_user)
        
        res.status(200).send(result[0])
    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message)
    }
}

