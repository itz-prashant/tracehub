import prisma from "./prismaClient";

async function testConnection() {
    try {
        await prisma.$connect();
        console.log('Database connected successfully')
    } catch (error) {
        console.log('Database connection failed:', error)
        process.exit(1)
    }
}

testConnection()