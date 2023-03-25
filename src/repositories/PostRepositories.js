
import { db } from "../config/database.js"

export async function insertPost(id_user, url, post) {

    return await db.query(`INSERT INTO posts(id_user, url, post) VALUES ($1, $2, $3)`, [id_user, url, post])

}

export async function insertLikePost(id_user, id_post) {
    return await db.query(`INSERT INTO likes(id_user, id_post) VALUES ($1, $2)`, [id_user, id_post])
}

export async function deleteLikePost(id_user, id_post) {
    return await db.query(`DELETE FROM likes WHERE id_user = $1 AND id_post = $2`, [id_user, id_post])
}

export async function getPostById(id_post) {

    return await db.query(`SELECT * FROM posts WHERE id = $1`, [id_post])

}


export async function insertComment(comment, id_user, id_post) {
    return await db.query(`INSERT INTO comments(comment, id_user, id_post) VALUES ($1, $2, $3)`, [comment, id_user, id_post])
}


