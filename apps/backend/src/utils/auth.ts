import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "dsfde35f6fyt656gyg7";

export function generateToken(userId: number, role: 'ADMIN' | 'CLIENT'): string {
    return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '1h' });
}

export function verifyToken(token: string): { userId: number, role: 'ADMIN' | 'CLIENT' } {
    return jwt.verify(token, JWT_SECRET) as { userId: number, role: 'ADMIN' | 'CLIENT' };
}
