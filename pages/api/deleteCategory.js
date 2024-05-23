import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
export default async function handler(req, res) {
    if (req.method !== "POST") return;
    const {id} = JSON.parse(req.body);
    await prisma.category.delete({where: {id: id}})
    res.status(200).send();
}
