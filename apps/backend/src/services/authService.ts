import bcrypt from 'bcrypt'
import prisma from '../prismaClient'
import { generateToken } from '../utils/auth'
import { createUser } from './userService'


export async function signup(distinct_id: string, email: string, password: string, properties?:object) {
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await createUser(
        distinct_id,
        email,
        hashedPassword,
        properties
    )

    const token  = generateToken(user.id)
    return {user, token}
}

export async function login(email:string, password:string) {
    const user = await prisma.user.findUnique({
        where: {email}
    })

    if (!user) throw new Error('User not found');

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) throw new Error('Invalid credentials');

    const token = generateToken(user.id)
    return {user, token}
}