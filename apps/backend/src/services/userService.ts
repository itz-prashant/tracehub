import prisma from "../prismaClient";

export async function createUser(email: string, password: string, role: "ADMIN"| "CLIENT") {
    // @ts-ignore
    return prisma.user.create({
        data: {    
            email,
            password,
            role
        }
    });
}

export async function getAllUser() {
    return prisma.user.findMany();
}
