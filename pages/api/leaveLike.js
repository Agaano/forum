import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {authorID, postID} = req.body;
        const newLike = await prisma.likes.create({
            data: {
                postId: postID,
                userId: authorID,
            }
        })
        const likes = await prisma.likes.findMany({
            where: {
                postId: postID,
            }
        })
        await prisma.$disconnect();
        res.status(200).json({
            message: 'Лайк успешно отправлен',
            likes: likes,
        })
    } else {
        res.status(500).json({message: 'Неподходящий метод'});
    }
}
