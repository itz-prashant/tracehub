import prisma from "../prismaClient"
import { v4 as uuidv4 } from 'uuid';


export async function createWebsite(userId:number, name:string, url:string) {
    const scriptKey = uuidv4()

    const clientExist = await prisma.client.findFirst({
        where: { user_id: userId }
    });

if (!clientExist) {
  throw new Error("Client (user) does not exist");
}

    return prisma.website.create({
        data:{
            client_id: clientExist.id,
            name,
            url,
            script_key:scriptKey
        }
    })
}

export async function getWebsiteByClient(userId: number) {
    const clientExist = await prisma.client.findFirst({
        where: { user_id: userId }
    });

    return prisma.website.findMany({
        where: {client_id: clientExist?.id}
    })
}