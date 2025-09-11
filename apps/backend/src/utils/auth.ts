import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'jwtsecret'

export function generateToken(userID:number): string{
    return jwt.sign({userID}, JWT_SECRET, {expiresIn: '1h'})
}

export function verifyToken(token:string): {userId: number} {
    try {
        const payload = jwt.verify(token, JWT_SECRET) as {userId: number};
        return payload
    } catch (error) {
        throw new Error('Invalid token');
    }
}