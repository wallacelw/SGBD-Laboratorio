import jwt from "jsonwebtoken"
import * as db from "../../database.js"
import { promisify } from "util"

export async function isAuthorized(req, res, next) {
    var token = await req.headers.authorization.split(' ')[1];
    var message;

    if (token) {
        try {
            const { id } = await promisify(jwt.verify)(token,"abcdefghijklmnopqrstuvwxyz123456")
            console.log(id) 
            const user = await db.getUserById(id)

            if (!user) {
                return res.status(401).send({message: "Nenhum usuário corresponde ao token fornecido."})
            }

            if (user[0].funcao != "administrador") {
                console.log(user)
                return res.status(401).send({message: "Somente administradores podem realizar essa função."})
            }

            return next();
        } catch (err) {
            console.log(err)
            return res.status(500).send(err)
        }
    } else {
        res.status(401).send({message: "Usuário não está logado!"})
        next();
    }

}