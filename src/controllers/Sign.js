import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { addUser, createToken } from '../repositories/userRepositories.js';

async function postSignUp(req, res) {
    const { username, email, password, image } = req.body;
    const passwordHashed = bcrypt.hashSync(password, 10);

    try {

        await addUser(username, email, passwordHashed, image)

        return res.sendStatus(201);
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
async function postSignIn(req, res) {
    const { id_user } = res.locals;

    try {
        const token = uuid();

        await createToken(id_user, token);

        return res.status(200).send({ token })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

export { postSignUp, postSignIn }