import { db } from "../config/database.js";

export async function getAllPosts() {
    return await db.query(`SELECT "posts"."id", "post", COALESCE("updatedAt", "posts"."createdAt") AS "post_date", "username", "image" AS "user_image", "url" AS "post_url", "posts"."id_user" FROM "posts" LEFT JOIN "users" ON "users"."id" = "posts"."id_user";`);
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