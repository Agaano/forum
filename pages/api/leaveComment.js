import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {author,text, postID} = req.body;
        const newComment = await prisma.comment.create({
            data: {
                postId: Number(postID),
                text: text,
                userId: author,
            }
        })
        await prisma.$disconnect();
        res.status(200).json({
            message: 'Комментарий успешно отправлен',
            newComment: newComment,
        })
    } else {
        res.status(500).json({message: 'Неподходящий метод'});
    }
}
