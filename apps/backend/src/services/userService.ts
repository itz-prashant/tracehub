import prisma from "../prismaClient";
import bcrypt from "bcrypt"

export async function createUser(email: string, password: string, role: "ADMIN"| "CLIENT") {
const hashedPassword = await bcrypt.hash(password, 10)
    return prisma.user.create({
        data: {    
            email,
            password: hashedPassword,
            role
        }
    });
}

export async function getAllUser() {
    return prisma.user.findMany();
}
