require('dotenv').config();
const connectDB =  require('./config/db')
const express = require('express');
const path = require('path')

const app = express();



const orderRoutes = require('./routes/orderRoutes');

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({extended:true}));

app.use('/pedidos', orderRoutes)

connectDB().then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`Servidor en: http://localhost:${process.env.PORT}`)
    });
});