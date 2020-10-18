import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {
    //validation
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new Error("JWT token is missing");
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
        throw new Error('Invalid JWT token');
    }
}