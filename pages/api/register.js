import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });

      if (existingUser) {
        return res.status(409).json({ message: 'Пользователь с таким email уже существует' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      //тоже завтра)

      return res.status(200).json({ message: 'Регистрация успешна' });
    } catch (error) {
      console.error('Ошибка при регистрации', error);
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  return res.status(405).json({ message: 'Метод не поддерживается' });
}
