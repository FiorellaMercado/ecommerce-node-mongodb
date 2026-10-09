require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const session = require('express-session')
const MongoStore = require('connect-mongo').default;

const Admin = require('./models/Admin');
const bcrypt=require('bcrypt')

const app = express();

app.set('view engine','pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  name: 'penguin.sid',
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    ttl: 24 * 60 * 60 //segundos
  }),
  cookie: {
    sameSite: 'lax',
    httpOnly: true, 
    maxAge: 1000 * 60 * 60 * 24, //milisegundos
    secure: false // con valor es es para produccion
  }
}));
app.use((req, res, next) => {
    res.locals.adminId = req.session.adminId;
    next();
});
app.get('/', (req, res) => res.send('Funciona'));
app.get('/prueba', (req, res) => {
    res.render('prueba')
})
app.get('/login', (req, res)=> {
    res.render('login')
})

app.post('/login', async (req,res,next)=> {
    const email=(req.body.email || '').trim().toLowerCase()
    const password =req.body['password']

    if (!email || !password) {
        return res.render('login', { error: 'Credenciales inválidas' });
    }

    const admin= await Admin.findOne({email}).select('+passwordHash')
    
    if (!admin || !await bcrypt.compare(password, admin.passwordHash)){
        
        return res.render('login',{ error: 'Credenciales inválidas' })
    }
    req.session.regenerate((err) => {
        if (err) return next(err);
        req.session.adminId = admin._id;
        res.redirect('/prueba');
    });
});
connectDB().then(()=> {
    app.listen(process.env.PORT, () => {
        console.log(`Servidor en http://localhost:${process.env.PORT}`)
    });
});