import prisma from "../prismaClient";


export async function getEventByName(event_name:string) {
    return prisma.event.count({
        where: {event_name}
    })
}

export async function getEventByUser(user_id: number) {
    return prisma.event.findMany({
        where: {user_id}
    })
}