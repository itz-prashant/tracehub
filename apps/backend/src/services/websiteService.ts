import prisma from "../prismaClient"
import { v4 as uuidv4 } from 'uuid';


export async function createWebsite(clientId:number, name:string, url:string) {
    const scriptKey = uuidv4()

    return prisma.website.create({
        data:{
            client_id: clientId,
            name,
            url,
            script_key:scriptKey
        }
    })
}

export async function getWebsiteByClient(clientId: number) {
    return prisma.website.findMany({
        where: {client_id: clientId}
    })
}