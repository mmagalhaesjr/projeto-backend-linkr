import { db } from "../config/database.js";

export async function getUsersByUsername(username) {
    return await db.query(`SELECT "id", "username", "image" FROM "users" WHERE "username" LIKE $1;`, [username]);
}

export async function getUserInfo(id) {
    return await db.query('SELECT * FROM users WHERE id = $1;', [id]);
}