import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import {withIronSessionApiRoute} from 'iron-session/next'

const prisma = new PrismaClient();

export default withIronSessionApiRoute(async (req,res) => {
    if (req.method === 'POST') {
      const { email, password } = req.body;
      try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          return res.status(404).json({ message: 'Пользователь не найден' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return res.status(401).json({ message: 'Неверный пароль' });
        }

        req.session.user = {
          id: user.id,
          isLogged: true,
          email: email,
          password: password,
        }
        await req.session.save();
        return res.status(200).json({ message: req.session.user});
      
      } catch (error) {
        console.error('Ошибка при аутентификации', error);
        return res.status(500).json({ message: 'Ошибка сервера' });
      }
    }

    return res.status(405).json({ message: 'Метод не поддерживается' });
  },
  {
    cookieName: "myapp_cookiename",
    password: "complex_password_at_least_32_characters_long",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  },
)

