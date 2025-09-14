
import bcrypt from 'bcrypt'
import prisma from '../prismaClient'

async function main() {
    const password = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10)

    await prisma.user.create({
        data:{
            email: process.env.ADMIN_EMAIL!,
            password: password,
            role: "ADMIN"
        }
    })
    console.log("Admin user created successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });