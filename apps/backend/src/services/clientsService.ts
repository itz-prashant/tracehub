import prisma from "../prismaClient";


export async function createClient(userId:number, name:string) {
    return prisma.client.create({
        data:{
            user_id: userId,
            name
        }
    })
}

export async function getAllClients() {
    return prisma.client.findMany()
}