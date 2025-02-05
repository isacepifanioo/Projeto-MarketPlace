import {Request} from 'express'

export function getToken(req: Request) {
    
    const bearerToken = req.headers.authorization

    const token = bearerToken?.split(' ')[1]

    return token

}