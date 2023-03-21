import { db } from "../config/database.js"

export async function insertPost(id_user, url, post) {

    return await db.query(`INSERT INTO posts(id_user, url, post) VALUES ($1, $2, $3)`, [id_user, url, post])

}

export async function insertLikePost(id_user, post_id) {
    return await db.query(`INSERT INTO likes(id_user, post_id) VALUES ($1, $2)`, [id_user, post_id])
}

export async function deleteLikePost(id_user, post_id) {
    return await db.query(`DELETE FROM likes WHERE id_user = $1 AND post_id = $2`, [id_user, post_id])
}

export async function getPosts() {
    return await db.query(`SELECT posts.id, posts.post, posts.url AS "post_url", COALESCE(posts."updatedAt", posts."createdAt") AS "post_date", users.username, users.image AS "user_image", coalesce(likes.likes_count, 0) as likes, like_info.id_liked, like_info.names_liked
    FROM posts
    LEFT JOIN users
    ON users.id = posts.id_user
    LEFT JOIN (SELECT likes.post_id, COUNT(*) as likes_count
    FROM likes
    GROUP BY likes.post_id) AS likes
    ON posts.id = likes.post_id
    LEFT JOIN (SELECT likes.post_id, JSON_agg(likes.id_user) as id_liked, JSON_agg(likes.username) as names_liked
    FROM (SELECT likes.*, users.username
    FROM likes
    JOIN users
    ON likes.id_user = users.id) AS LIKES
    GROUP BY likes.post_id) AS like_info
    ON posts.id = like_info.post_id
    ORDER BY post_date DESC
    LIMIT 20;`)
}

export async function getPostById(post_id) {

    return await db.query(`SELECT * FROM posts WHERE id = $1`, [post_id])

}    