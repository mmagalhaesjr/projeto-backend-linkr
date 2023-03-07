import bcrypt from 'bcrypt';
import { deleteToken, findTokenUser, findUser } from "../repositories/userRepositories.js";

export async function postSignInValidation(req, res, next){
    const { email, password } = req.body;

    try {

        const userExist = await findUser(email);
        if (userExist.rowCount === 0) return res.sendStatus(401);

        if (!bcrypt.compareSync(password, userExist.rows[0].password)) return res.sendStatus(401);

        const tokenUserExist = await findTokenUser(userExist.rows[0].id);
        if (tokenUserExist.rowCount !== 0) {
            await deleteToken(userExist.rows[0].id)
        }

        res.locals.id_user = userExist.rows[0].id;

        next();
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}