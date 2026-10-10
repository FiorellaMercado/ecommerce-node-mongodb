require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const session = require('express-session')
const MongoStore = require('connect-mongo').default;
const setLocal=require('./middleware/setLocals');

const authRoutes=require('./routes/authRoutes');
const productRoutes=require('./routes/productRoutes')
const methodOverride = require('method-override');

if (!process.env.SESSION_SECRET) {
    console.error('Falta SESSION_SECRET en el .env');
    process.exit(1);
}

const app = express();

app.set('view engine','pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

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

app.use(setLocal);

app.get('/', (req, res) => res.send('Funciona'));
// app.get('/prueba', (req, res) => {
//     res.render('prueba')
// });
app.use('/', authRoutes);

app.use('/productos',productRoutes)


connectDB().then(()=> {
    app.listen(process.env.PORT, () => {
        console.log(`Servidor en http://localhost:${process.env.PORT}`)
    });
});