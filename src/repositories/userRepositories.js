import { db } from "../config/database.js";

export async function addUser(username, email, passwordHashed, image) {
    return await db.query('INSERT INTO users (username, email, password, image) values ($1, $2, $3, $4);', [username, email, passwordHashed, image])
}
export async function findUser(email){
    return await db.query('SELECT * FROM users WHERE email = $1;', [email])
}
export async function findTokenUser(id){
    return await db.query('SELECT * FROM sessions WHERE id_user = $1;', [id])
}
export async function deleteToken(id){
    return await db.query('DELETE FROM sessions WHERE id_user = $1;', [id])
}
export async function createToken(id_user, token){
    return await db.query('INSERT INTO sessions (id_user, token) VALUES ($1, $2);', [id_user, token])
}
export async function  findUserByToken(token){
    return await db.query(`SELECT id_user FROM sessions WHERE token = $1`, [token]);   
}