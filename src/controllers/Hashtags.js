import { db } from "../config/database.js";

export async function trendingHashtags(req, res) {
//   const { hashtag } = req.params;

//   console.log(hashtag);

//   if (!isNaN(hashtag)) return res.sendStatus(400);

  try {
    const {rows: result} = await db.query(`
        SELECT REGEXP_MATCHES(p.post, '#([A-Za-z0-9]+)', 'g') AS hashtags, count(p) AS num
        FROM posts p
        GROUP BY hashtags
        ORDER BY num DESC;
        `);
    console.log(result)
    res.status(200).send(result)
  } catch (error) {
    res.status(500).send(error.message);
  }
}

