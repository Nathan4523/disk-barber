import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

import AppError from '../errors/AppError';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {
    //validation
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError("JWT token is missing", 401);
    }

    //para novas versões, é possivel fazer desestruturação com array
    //Ao deixar só a virgula, significa que não é necessário puxar a primeira casa do array
    const [, token] = authHeader.split(' ');

    try{
        const decoded = verify(token, authConfig.jwt.secret);
        
        const { sub } = decoded as TokenPayload; //force type variable

        request.user = {
            id: sub
        }

        return next();
    }catch{
        throw new AppError('Invalid JWT token', 401);
    }
}