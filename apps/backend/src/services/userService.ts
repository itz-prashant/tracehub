import prisma from "../prismaClient";

// export async function createUser(distinct_id: string, email: string, password: string, properties?:object) {
//     // @ts-ignore
//     return prisma.user.create({
//         data: {    
//             email,
//             password,
//             properties
//         }
//     });
// }

export async function getAllUser() {
    return prisma.user.findMany();
}
