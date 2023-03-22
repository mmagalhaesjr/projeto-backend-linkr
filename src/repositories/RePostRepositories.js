import { db } from "../config/database.js";

export async function isReposted(id) {
    return await db.query(`SELECT * FROM reposts WHERE id_post = $1;`, [id]);
}
export async function Repost(id, id_user){
    return await db.query('INSERT INTO reposts (id_post, id_user) VALUES ($1, $2);', [id, id_user])
}