import { db } from "../config/database.js";

export async function getUsersByUsername(username) {
    return await db.query(`SELECT "id", "username", "image" FROM "users" WHERE "username" LIKE $1;`, [username]);
}

export async function findUserById(id_user) {
    return await db.query(`SELECT "username", "image" FROM "users" WHERE "id" = $1;`, [id_user]);
}