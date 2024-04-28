import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { query } = req.query;
  let results = await prisma.posts.findMany({
    where: {
      title: {contains : query}
    },
    select: {
      title : true,
      ID : true,
      author: true,
      description: false,
      text: false,
      theme: true,
      date: true,
      image: false,
    }
  });
  await prisma.$disconnect();
  res.status(200).json({
    posts: results,
  })
}
