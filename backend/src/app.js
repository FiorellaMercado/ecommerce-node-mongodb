require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

app.set('view engine','pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => res.send('Funciona'));

connectDB().then(()=> {
    app.listen(process.env.PORT, () => {
        console.log(`Servidor en http://localhost:${process.env.PORT}`)
    });
});