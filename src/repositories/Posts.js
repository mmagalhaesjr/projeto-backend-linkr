import { db } from "../config/database.js";

export async function getAllPosts() {
    return await db.query(`SELECT "id", "post", ISNULL("updatedAt", "createdAt") AS "post_date" FROM "posts";`);
}

export async function getUserAndUserPostsById(id_user) {
    return await db.query(`SELECT "id", "post", ISNULL("updatedAt", "createdAt") AS "post_date" FROM "posts WHERE "id_user" = $1;`, [id_user]);
}