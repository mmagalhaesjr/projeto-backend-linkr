import { insertPost } from '../repositories/postRepositories.js';


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