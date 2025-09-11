import prisma from "../prismaClient";

export async function createEvents(userId:number, event:string, properties:object){

    const user = await prisma.user.findUnique({
        where: {id: userId}
    })

    if (!user) throw new Error('User not found');

    return prisma.event.create({
        data:{
            user_id: user.id,
            event_name: event,
            properties
        }
    })
}

export async function getAllEvents() {
    return prisma.event.findMany()
}