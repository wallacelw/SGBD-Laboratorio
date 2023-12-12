import jwt from "jsonwebtoken"
import * as db from "../../database.js"
import { promisify } from "util"

export async function isAuthorized(req, res, next) {
    var token = await req.headers.authorization.split(' ')[1];
    console.log(token)
    if (token) {
        try {
            const { id } = await jwt.verify(token,"abcdefghijklmnopqrstuvwxyz123456")
            console.log(id)
            const user = await db.getUserById(id)
            
            if (!user) {
                return next()
            }
            
            req.user = user
            return next();
        } catch (err) {
            console.log(err)
            return next()
        }
    } else {
        next();
    }
}