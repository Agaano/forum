import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
export default async function handler(req, res) {
    const { theme } = req.query;
    let data;
    if (theme === 'all_themes') {
        data = await prisma.posts.findMany();
    } else data = await prisma.posts.findMany({
        where: {
            theme: theme
        }
    });

    const CommentsData = await Promise.all(data.map(async (post) => {
        const comments = await prisma.comment.findMany({
            where : {
                postId: post.ID,
            }
        });
        const newPost = post;
        newPost.comments = comments;
        return newPost;
    })); 
    const LikesCommentsData = await Promise.all(CommentsData.map(async (post) => {
        const likes = await prisma.likes.findMany({
            where: {
                postId: post.ID,
            }
        })
        const newPost = post;
        newPost.likes = likes;
        return newPost;
    }))
    await prisma.$disconnect();
    res.status(200).json({
        posts: LikesCommentsData,
    })
}