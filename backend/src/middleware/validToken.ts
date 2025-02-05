import {Request, Response, NextFunction} from 'express'
import { getToken } from '../helper/get-token'

export function validToken(req: Request, res: Response, next: NextFunction) {

    const token = getToken(req) as string
    const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;

    if(!jwtRegex.test(token)) {
        res.status(401).json({body: "Token inválido"})
        return
    }

    next()

}