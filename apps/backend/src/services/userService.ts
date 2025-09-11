import prisma from "../prismaClient";

export async function createUser(distinct_id: string, properties: object) {
    // @ts-ignore
    return prisma.user.create({
        data: {    
            distinct_id,
            properties
        }
    });
}

export async function getAllUser() {
    // @ts-ignore
    return prisma.user.findMany();
}
