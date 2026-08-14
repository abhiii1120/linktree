import env from "../config/env.js";
import notFound from "../shared/errors/notFound.js";
import UnAuthorize from "../shared/errors/unAuthorize.js";
import jwt from 'jsonwebtoken';
export default function authMiddleware(req,res,next) {
    const token = req.cookies.accessToken;

    if(!token) throw new notFound('token not found');

    try {
        const decoded = jwt.verify(token,env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        throw new UnAuthorize('Invalid token');
    }
}