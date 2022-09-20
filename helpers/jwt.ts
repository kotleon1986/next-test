import * as jwt from 'jsonwebtoken'
import { User } from '../store/auth/auth.slice'

interface ITokenData extends User {
    sub: number;
    exp: number;
}

export const parseToken = (token: string): User | null => {
    const data = jwt.decode(token) as unknown as ITokenData
    
    if (Date.now() > data.exp) {
        const { firstName, lastName, sub: id, email } = data
        return { firstName, lastName, id, email }
    }

    return null
}