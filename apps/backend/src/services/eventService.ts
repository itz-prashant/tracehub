import prisma from "../prismaClient";

export async function createEvent(websiteId: number, eventName: string, properties?: object) {
    return prisma.event.create({
        data: {
            website_id: websiteId,
            event_name: eventName,
            properties
        }
    });
}

export async function getEventsByWebsite(websiteId: number) {
    return prisma.event.findMany({
        where: { website_id: websiteId }
    });
}

export async function getEventCountByWebsite(websiteId: number) {
    return prisma.event.count({
        where: { website_id: websiteId }
    });
}
