import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {id,postID} = req.body;
        const deletedLike = await prisma.likes.delete({
            where: {
                id: id,
            }
        })
        const likes = await prisma.likes.findMany({
            where: {
                postId: postID,
            }
        })
        await prisma.$disconnect();
        res.status(200).json({
            message: 'Лайк успешно удалён',
            likes: likes,
        })
    } else {
        res.status(500).json({message: 'Неподходящий метод'});
    }
}
