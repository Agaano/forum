import session from 'express-session';

export const sessionStore = session.MemoryStore();
console.log()

export default session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: sessionStore,
})

