import {withIronSessionApiRoute} from 'iron-session/next'
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default withIronSessionApiRoute(async (req,res) => {
    const user = req.session.user;
    if (user) {
        const userDb = await prisma.user.findUnique({where: {email: user.email}})
        const passwordMatch = await bcrypt.compare(user.password, userDb.password);
        if (passwordMatch) {
            res.status(200).json({
                isLogged: true,
                id: userDb.id,
                name: userDb.name,
                email: userDb.email,
            })
        } else req.session.destroy();
    } else {
        res.status(200).json({});
    }
},
{
    cookieName: "myapp_cookiename",
    password: "complex_password_at_least_32_characters_long",
    ttl: 60*60*24*30, // 30 дней)
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    }
})