import { db } from "../config/database.js";

export async function getAllPosts() {
    return await db.query(`SELECT "posts"."id", "post", COALESCE("updatedAt", "posts"."createdAt") AS "post_date", "username", "image" AS "user_image", "url" AS "post_url", "posts"."id_user" FROM "posts" LEFT JOIN "users" ON "users"."id" = "posts"."id_user";`);
}

export async function getUserPostsById(id_user) {
    return await db.query(`SELECT "id", "post", COALESCE("updatedAt", "createdAt") AS "post_date", "url" AS "post_url" FROM "posts" WHERE "id_user" = $1;`, [id_user]);
}