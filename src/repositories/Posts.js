import { db } from "../config/database.js";

export async function getAllPosts() {
    return await db.query(`SELECT "posts"."id", "post", COALESCE("updatedAt", "posts"."createdAt") AS "post_date", "username", "image" AS "user_image", "url" AS "post_url" FROM "posts" LEFT JOIN "users" ON "users"."id" = "posts"."id_user";`);
}

export async function getUserAndUserPostsById(id_user) {
    return await db.query(`SELECT "id", "post", ISNULL("updatedAt", "createdAt") AS "post_date" FROM "posts WHERE "id_user" = $1;`, [id_user]);
}