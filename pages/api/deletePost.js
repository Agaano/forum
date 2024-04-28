import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export default async function handler(req, res) {
    if (req.method === 'POST') {
        const ID = req.body.id;
        await prisma.posts.delete({where: {ID: ID}});
        await prisma.$disconnect();
        res.status(200).json({message: 'Запись успешно удалена'})
    } else {
        res.status(500).json({message: 'Неподходящий метод'})
    }
}