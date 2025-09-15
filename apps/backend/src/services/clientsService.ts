import prisma from "../prismaClient";
import bcrypt from 'bcrypt'

export async function createClient(email:string,password: string, clientName:string) {
const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data:{
            email,
            password: hashedPassword,
            role:"CLIENT"
        }
    })
    
    const client = await prisma.client.create({
        data: {
            user_id: user.id,
            name: clientName
        }
    })

    return client
}

export async function getAllClients() {
    return prisma.client.findMany()
}

export async function getClientsByUser(userId: number) {
    return prisma.client.findUnique({
        where: {id: userId}
    })
}