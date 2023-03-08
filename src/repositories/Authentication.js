import { db } from "../config/database.js";

export async function findAuthToken(token) {
    return await db.query('SELECT "id_user" FROM "sessions" WHERE "token" = $1;', [token]);
}