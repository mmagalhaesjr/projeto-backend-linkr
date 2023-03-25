import { db } from "../config/database.js";

export async function getAllPosts() {
    return await db.query(`SELECT "posts"."id", "post", COALESCE("updatedAt", "posts"."createdAt") AS "post_date", "username", "image" AS "user_image", "url" AS "post_url", "posts"."id_user" FROM "posts" LEFT JOIN "users" ON "users"."id" = "posts"."id_user";`);
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