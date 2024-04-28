import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {id, postID} = req.body;
        await prisma.comment.delete({
            where: {
                id: id,
            }
        })
        res.status(200).json({message: 'Комментарий успешно удалён!'});
    } else {
        res.status(500).json({message: 'Неподходящий метод'});
    }
}
