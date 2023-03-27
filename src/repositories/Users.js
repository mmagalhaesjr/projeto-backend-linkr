import { db } from "../config/database.js";

export async function getUsersByUsername(id_user, username) {
    return await db.query(`SELECT "users"."id", "username", "image", EXISTS(SELECT 1 FROM "follows" WHERE "id_followed_user" = "users"."id" AND "id_follower_user" = $1 AND "id_followed_user" != $1) AS "isFollowing" FROM "users" LEFT JOIN "follows" ON "users"."id" = "follows"."id_followed_user" AND "follows"."id_follower_user" = $1 WHERE "username" ILIKE $2 ORDER BY "isFollowing" DESC;`, [id_user, `%${username}%`]);
}

export async function findUserById(id_follower_user, id_followed_user) {
    return await db.query(`SELECT "users"."id", "username", "image", EXISTS(SELECT 1 FROM "follows" WHERE "id_followed_user" = "users"."id" AND "id_follower_user" = $1 AND "id_followed_user" != $1) AS "isFollowing" FROM "users" LEFT JOIN "follows" ON "users"."id" = "follows"."id_followed_user" AND "follows"."id_follower_user" = $1 WHERE "users"."id" = $2;`, [id_follower_user, id_followed_user]);
}

export async function getUserInfo(id) {
    return await db.query(`SELECT users.*, following.following_list, EXISTS(SELECT 1 FROM "follows" WHERE "id_follower_user" = $1) AS "isFollowingUsers" 
    FROM users 
    LEFT JOIN (SELECT follows.id_follower_user, json_agg(follows.id_followed_user) as following_list
    FROM follows
    GROUP BY follows.ID_FOLLOWER_USER) AS following
    ON following.id_follower_user = users.id
    WHERE users.id = $1`, [id]);
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