import { findAuthToken } from "../repositories/Authentication.js";

async function isUserAuthenticated(req, res, next) {
    let { authorization } = req.headers;
    if (!authorization || typeof authorization !== "string") return res.status(401).send("invalid header authorization token");
    if (!authorization.includes("Bearer")) return res.status(401).send("invalid header authorization token");
    authorization = authorization.replace("Bearer ", "");
    try {
        const authenticationQuery = await findAuthToken(authorization);
        if (authenticationQuery.rows.length === 0) return res.status(401).send("invalid header authorization token");
        req.authentication = authenticationQuery.rows[0];
        return next();
    }
    catch (_) {
        return res.status(401).send("invalid header authorization token");
    }
}

export { isUserAuthenticated };