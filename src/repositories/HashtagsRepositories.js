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

export async function findHashtags(hashtag){
    return await db.query(
        `SELECT * FROM posts WHERE post LIKE '%#${hashtag}%'`
      );
}
