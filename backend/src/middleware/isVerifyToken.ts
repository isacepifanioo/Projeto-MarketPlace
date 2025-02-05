import {Request, Response, NextFunction} from 'express'

export function isVerifyToken(req: Request, res: Response, next: NextFunction) {

    if(req.headers.authorization) {
        next()
        return
    }

    res.status(401).json({message: "Você não tem autorização. Crie uma conta ou faça login"})
    return

}