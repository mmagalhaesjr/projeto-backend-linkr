import { db } from "../config/database.js"

export async function insertPost(id_user, url, description){

    return await db.query(`INSERT INTO post(id_user, url, description) VALUES ($1, $2, $3)`, [id_user, url, description])
    
}    

export async function insertLikePost(user_id, post_id){
    return await db.query(`INSERT INTO likes(user_id, post_id) VALUES ($1, $2)`, [user_id, post_id])
    } 

export async function deleteLikePost(user_id, post_id){
    return await db.query(`DELETE FROM likes WHERE user_id = $1 AND post_id = $2`, [user_id, post_id])
    } 
    
export async function getPosts(){
    return await db.query(`SELECT * FROM posts`) //esta query ainda vai ser alterada
    } 
