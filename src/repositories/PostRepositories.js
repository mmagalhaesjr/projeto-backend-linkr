
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

export async function getPosts() {
    return await db.query(`SELECT posts.id, posts.post, posts.url AS "post_url", COALESCE(posts."updatedAt", posts."createdAt") AS "post_date", users.id as post_user_id, users.username, users.image AS "user_image", coalesce(likes.likes_count, 0) as likes, like_info.id_liked, like_info.names_liked, coalesce("comments".comments_count, 0) as comments_count, "comments".allcomments, COALESCE(reposts.reposts_count, 0) AS reposts
    FROM posts
    LEFT JOIN users
    ON users.id = posts.id_user
    LEFT JOIN (SELECT likes.id_post, COUNT(*) as likes_count
    FROM likes
    GROUP BY likes.id_post) AS likes
    ON posts.id = likes.id_post
    LEFT JOIN (SELECT likes.id_post, JSON_agg(likes.id_user) as id_liked, JSON_agg(likes.username) as names_liked
    FROM (SELECT likes.*, users.username
    FROM likes
    JOIN users
    ON likes.id_user = users.id) AS LIKES
    GROUP BY likes.id_post) AS like_info
    ON posts.id = like_info.id_post
	LEFT JOIN (SELECT COUNT(*) as comments_count, tabela.id_post, JSON_agg(tabela.allcomments) as allcomments
    FROM (
	SELECT id_post, json_build_object(
	'id_comment', "comments".id, 'comment', comment, 'id_user', id_user, 'username', users.username, 'user_image', users.image
) AS allcomments
	FROM "comments"
	LEFT JOIN users
	ON "comments".id_user = users.id) AS tabela
	GROUP BY tabela.id_post) AS "comments"
	ON "comments".id_post = posts.id

    LEFT JOIN (SELECT posts_shares.id_post, COUNT(*) as reposts_count
    FROM posts_shares
    GROUP BY posts_shares.id_post) AS reposts
    ON posts.id = reposts.id_post

    ORDER BY post_date DESC
    LIMIT 20;`)
}

export async function getReposts(){
    return await db.query(`SELECT ps.*, users.username FROM posts_shares ps JOIN users ON users.id = ps.id_user;`)
}

export async function getPostById(id_post) {

    return await db.query(`SELECT * FROM posts WHERE id = $1`, [id_post])

}


export async function insertComment(comment, id_user, id_post) {
    return await db.query(`INSERT INTO comments(comment, id_user, id_post) VALUES ($1, $2, $3)`, [comment, id_user, id_post])
}

export async function countPosts(id_user){
    return await db.query(`
    SELECT count(f.id_follower_user) AS num_posts
    FROM posts p
    JOIN follows f
        ON f.id_followed_user = p.id_user
    WHERE f.id_follower_user = $1
    GROUP BY f.id_follower_user`,[id_user])
}

