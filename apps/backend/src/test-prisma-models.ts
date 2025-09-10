import { PrismaClient } from '@prisma/client';

const prisma:any = new PrismaClient();

async function testModels() {
  try {
    const users = await prisma.user.findMany();  
    console.log(' User model is working. Fetched users:', users);
  } catch (error) {
    console.error(' Model test failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testModels();
