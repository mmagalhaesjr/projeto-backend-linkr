import { db } from "../config/database.js"

export async function insertPost(id_user, url, post){

    return await db.query(`INSERT INTO posts(id_user, url, post) VALUES ($1, $2, $3)`, [id_user, url, post])
    
}    

export async function insertLikePost(user_id, post_id){
    return await db.query(`INSERT INTO likes(user_id, post_id) VALUES ($1, $2)`, [user_id, post_id])
    } 

export async function deleteLikePost(user_id, post_id){
    return await db.query(`DELETE FROM likes WHERE user_id = $1 AND post_id = $2`, [user_id, post_id])
    } 
    
export async function getPosts(){
    return await db.query(`SELECT "posts"."id", "post", COALESCE("updatedAt", "posts"."createdAt") AS "post_date", "username", "image" AS "user_image", "url" AS "post_url", likes."likesCount" 
    FROM "posts" 
    LEFT JOIN "users" 
    ON "users"."id" = "posts"."id_user"
    LEFT JOIN (SELECT likes.post_id, COUNT(*) as "likesCount"
    FROM likes
    GROUP BY likes.post_id) AS likes
    ON posts.id = likes.post_id
    ORDER BY post_date DESC`) //esta query ainda vai ser alterada. Necessário pegar nome do users que curtiram o post
    } 
