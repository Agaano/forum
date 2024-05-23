import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
export default async function handler(req, res) {
    if (req.method !== "POST") return;
    const {name} = JSON.parse(req.body);
    console.log(name);
    console.log(typeof req.body)
    await prisma.category.create({data: {
        name
    }});
    res.status(200).send();
}
