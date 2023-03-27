import { db } from "../config/database.js";

export async function getAllPosts(id_user) {
    return await db.query(`SELECT "posts"."id", "post", COALESCE("updatedAt", "posts"."createdAt") AS "post_date", "username", "image" AS "user_image", "url" AS "post_url", "posts"."id_user", coalesce("likes"."likes_count", 0) as "likes", "like_info"."id_liked", "like_info"."names_liked", coalesce("comments"."comments_count", 0) as "comments_count", "comments"."allcomments", COALESCE("reposts"."reposts_count", 0) AS "reposts" FROM "posts" LEFT JOIN "users" ON "users"."id" = "posts"."id_user" LEFT JOIN "follows" ON "users"."id" = "follows"."id_followed_user" AND "follows"."id_follower_user" = $1 LEFT JOIN (SELECT likes.id_post, COUNT(*) as likes_count FROM likes GROUP BY likes.id_post) AS likes ON posts.id = likes.id_post LEFT JOIN (SELECT likes.id_post, JSON_agg(likes.id_user) as id_liked, JSON_agg(likes.username) as names_liked FROM (SELECT likes.*, users.username FROM likes JOIN users ON likes.id_user = users.id) AS LIKES GROUP BY likes.id_post) AS like_info ON posts.id = like_info.id_post LEFT JOIN (SELECT COUNT(*) as comments_count, tabela.id_post, JSON_agg(tabela.allcomments) as allcomments FROM ( SELECT id_post, json_build_object( 'id_comment', "comments".id, 'comment', comment, 'id_user', id_user, 'username', users.username, 'user_image', users.image ) AS allcomments   FROM "comments" LEFT JOIN users ON "comments".id_user = users.id) AS tabela GROUP BY tabela.id_post) AS "comments" ON "comments".id_post = posts.id LEFT JOIN (SELECT posts_shares.id_post, COUNT(*) as reposts_count FROM posts_shares GROUP BY posts_shares.id_post) AS reposts ON posts.id = reposts.id_post WHERE "follows"."id_followed_user" = "users"."id" ORDER BY post_date DESC LIMIT 10;`, [id_user]);
}

export async function getUserAndUserPostsById(id_user) {
    return await db.query(`SELECT "id", "post", ISNULL("updatedAt", "createdAt") AS "post_date" FROM "posts WHERE "id_user" = $1;`, [id_user]);
}

export async function getUserPostsById(id_user) {
    return await db.query(`SELECT "posts"."id", "post", COALESCE("updatedAt", "posts"."createdAt") AS "post_date", "username", "image" AS "user_image", "url" AS "post_url", "posts"."id_user" FROM "posts" LEFT JOIN "users" ON "users"."id" = "posts"."id_user" WHERE "id_user" = $1;`, [id_user]);
}

export async function getPostFromUser(id_post, id_user) {
    return await db.query("SELECT * FROM posts WHERE id = $1 AND id_user = $2;", [id_post, id_user]);
}

export async function deletePostById(id_post) {
    return await db.query("DELETE FROM posts WHERE id = $1;", [id_post]);
}

export async function editPostById(id_post, post) {
    return await db.query("UPDATE posts SET post = $1, \"updatedAt\" = NOW() WHERE id = $2;", [post, id_post]);
}
