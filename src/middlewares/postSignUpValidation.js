import { findUser } from "../repositories/userRepositories.js";

export async function postSignUpValidation(req, res, next) {
    const { email } = req.body;

    try {

        const userExist = await findUser(email);
        if (userExist.rowCount !== 0) return res.sendStatus(409);

        next();
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}