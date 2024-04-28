import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
export default async function handler(req, res) {
    const {postID} = req.query;
    const length = await prisma.comment.count({
        where: {
            postId: Number(postID),
        }
    });
    res.status(200).json({
        length: length,
    });
}
