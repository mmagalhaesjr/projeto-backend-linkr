import { db } from "../config/database.js";

export async function getUsersByUsername(username) {
    return await db.query(`SELECT "id", "username", "image" FROM "users" WHERE "id" LIKE $1;`, [username]);
}