import { db } from "../config/database.js";

export async function filterHashtags() {
  return await db.query(`
    SELECT REGEXP_MATCHES(p.post, '#([A-Za-z0-9]+)', 'g') AS hashtags, count(p) AS num
    FROM posts p
    GROUP BY hashtags
    ORDER BY num DESC
    LIMIT 10
    `);
}

export async function findHashtags(hashtag) {
  return await db.query(
    `
    SELECT "posts"."id", "post", COALESCE("updatedAt", "posts"."createdAt") AS "post_date", "username", "image" AS "user_image", "url" AS "post_url", "posts"."id_user", coalesce("likes"."likes_count", 0) as "likes", "like_info"."id_liked", "like_info"."names_liked", coalesce("comments"."comments_count", 0) as "comments_count", "comments"."allcomments", COALESCE("reposts"."reposts_count", 0) AS "reposts" 
    FROM "posts" 
    LEFT JOIN "users" 
      ON "users"."id" = "posts"."id_user" 
    LEFT JOIN (SELECT likes.id_post, COUNT(*) as likes_count FROM likes GROUP BY likes.id_post) AS likes ON posts.id = likes.id_post LEFT JOIN (SELECT likes.id_post, JSON_agg(likes.id_user) as id_liked, JSON_agg(likes.username) as names_liked FROM (SELECT likes.*, users.username FROM likes JOIN users ON likes.id_user = users.id) AS LIKES GROUP BY likes.id_post) AS like_info ON posts.id = like_info.id_post LEFT JOIN (SELECT COUNT(*) as comments_count, tabela.id_post, JSON_agg(tabela.allcomments) as allcomments FROM ( SELECT id_post, json_build_object( 'id_comment', "comments".id, 'comment', comment, 'id_user', id_user, 'username', users.username, 'user_image', users.image ) AS allcomments   FROM "comments" LEFT JOIN users ON "comments".id_user = users.id) AS tabela GROUP BY tabela.id_post) AS "comments" ON "comments".id_post = posts.id LEFT JOIN (SELECT posts_shares.id_post, COUNT(*) as reposts_count FROM posts_shares GROUP BY posts_shares.id_post) AS reposts ON posts.id = reposts.id_post
    WHERE "posts"."post" ILIKE '%#${hashtag}%'
    ORDER BY post_date DESC LIMIT 10`
  );
}
