import prisma from "../prismaClient";

interface EventPayload {
  script_key: string
  event_name: string
  properties?: Record<string, any>
}

export async function trackEvent(payload:EventPayload) {
    const {script_key, event_name, properties} = payload

    const website = await prisma.website.findUnique({
        where:{script_key}
    })

    if (!website) {
    throw new Error("Invalid script_key");
  }

  return prisma.event.create({
    data:{
        website_id: website.id,
        event_name,
        properties: properties || {}
    }
  })
}
