
import { findUserByToken } from '../repositories/userRepositories.js';

export async function validateToken(req, res, next) {
  
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');
 
  if(!token) return res.sendStatus(401)
  
  try {
    
    const session = await findUserByToken(token);
  
    if (!session.rows[0]) return res.sendStatus(401)
    
    res.locals.id_user = session.rows[0].id_user
    console.log('passou pelo validate token e esse é o id do user', session.rows[0].id_user)
    next();


  } catch (error) {

    return res.sendStatus(500);
  }

};