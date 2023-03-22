import { Repost } from "../repositories/RePostRepositories.js";

async function RePost(req, res) {
    const id_user = res.locals.id_user
    const { id } = req.body; //id do post

    try {
        
        await Repost(id, id_user)
        
        return res.sendStatus(200)
        
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

export { RePost };