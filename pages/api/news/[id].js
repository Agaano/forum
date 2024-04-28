import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const news = await prisma.posts.findUnique({
      where: {
        ID: Number(id),
      },
    });
    const comments = await prisma.comment.findMany({
      where: {
        postId: Number(id),
      }
    })
    news.comments = comments;
    res.status(200).json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}
