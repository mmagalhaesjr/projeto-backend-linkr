import { getPostById } from '../repositories/PostRepositories.js';

export async function verifyIfPostExists(req, res, next) {
    const post_id = req.params.id

    try {

        const postExist = await getPostById(post_id);

        if (!postExist.rows[0]) return res.sendStatus(404)

        next();


    } catch (error) {

        return res.sendStatus(500);
    }

};