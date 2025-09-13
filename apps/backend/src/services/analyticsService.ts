import prisma from "../prismaClient";

export async function fetchAnalyticsByScriptKey(script_key: string) {
  const website = await prisma.website.findUnique({
    where: { script_key },
    include: { events: true },
  });

  if (!website) {
    throw new Error("Website not found");
  }

  const eventCounts = await prisma.event.groupBy({
    by: ['event_name'],
    where:{website_id: website.id},
    _count: {event_name: true}
  })

  return {
    website:{
        id: website.id,
        name: website.name,
        url: website.url
    }
  }

}
