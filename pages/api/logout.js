import {withIronSessionApiRoute} from 'iron-session/next'

export default withIronSessionApiRoute(async (req,res,session) => {
    req.session.destroy();
    res.status(200).send();
},
{
    cookieName: "myapp_cookiename",
    password: "complex_password_at_least_32_characters_long",
    ttl: 60*60*24*30, // 30 дней)
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    }
})