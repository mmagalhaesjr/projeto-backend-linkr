import { db } from "../config/database.js"

export async function insertPost(id_user, url, description){

    return await db.query(`INSERT INTO post(id_user, url, description) VALUES ($1, $2, $3)`, [id_user, url, description])
    
}    