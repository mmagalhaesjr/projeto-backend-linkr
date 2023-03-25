import { isReposted, postExist } from "../repositories/RePostRepositories.js";

export async function alreadyReposted(req, res, next) {
    const idUser = res.locals.id_user
    const { id } = req.body; 
    try {
        if(!id) return res.status(404).send('The requested resource was not found')
        if(typeof(id) !== 'number') return res.status(400).send('Invalid input: Please provide a valid number')

        const postExists = await postExist(id);
        if(!postExists.rows[0]) return res.status(404).send('The requested resource was not found')

        const reposted = await isReposted(id)

        let thisUserReposted;

        if (reposted.rows.length !== 0) {
            
            thisUserReposted = reposted.rows.find((e) => e.id_user === idUser);
            
        }
        if(reposted.rowCount === 0) thisUserReposted = false;

        if (thisUserReposted) return res.status(409).send('Conflict: The requested action cannot be completed because the post has already been reposted.')

        next();

    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}