import {Request} from 'express'

export interface httpRespose<B> {
    StatusCode: number,
    Body: B | string,
    token?: string
}

export interface httpRequest<B> {
    params?: string,
    body?: B,
    req?: Request
}