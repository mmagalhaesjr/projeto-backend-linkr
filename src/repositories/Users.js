import { db } from "../config/database.js";

export async function getUsersByUsername(username) {
    return await db.query(`SELECT "id", "username", "image" FROM "users" WHERE "username" ILIKE $1;`, [`%${username}%`]);
}

export async function findUserById(id_user) {
    return await db.query(`SELECT "users"."id", "username", "image", (CASE WHEN "follows"."id_followed_user" IS NULL THEN FALSE ELSE TRUE END) AS "isFollowing" FROM "users" LEFT JOIN "follows" ON "users"."id" = "follows"."id_followed_user" WHERE "users"."id" = $1;`, [id_user]);
}

export async function getUserInfo(id) {
    return await db.query('SELECT * FROM users WHERE id = $1;', [id]);
}

export async function verifyIsFollowingUser(id_follower_user, id_followed_user) {
    return await db.query(`SELECT * FROM "follows" WHERE "id_follower_user" = $1 AND "id_followed_user" = $2;`, [id_follower_user, id_followed_user]);
}

export async function setFollowUser(id_follower_user, id_followed_user) {
    return await db.query(`INSERT INTO "follows" ("id_follower_user", "id_followed_user") VALUES ($1, $2);`, [id_follower_user, id_followed_user]);
}

export async function setUnfollowUser(id_follower_user, id_followed_user) {
    return await db.query(`DELETE FROM "follows" WHERE "id_follower_user" = $1 AND "id_followed_user" = $2;`, [id_follower_user, id_followed_user]);
}