require('dotenv').config();
const connectDB = require('../config/db');
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

async function main() {
    try{
        await connectDB()
        const admin= await Admin.findOne({ email: process.env.ADMIN_EMAIL});

        if (admin === null){
            const password_hash=await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
            await Admin.create({email: process.env.ADMIN_EMAIL, nombre: process.env.ADMIN_NOMBRE, passwordHash: password_hash});
            console.log('Admin Paula creada');
        }else{
            console.error('Admin Paula ya existe');
            process.exitCode = 1
        }
    }catch(error){
        console.log('Error: ', error);
    }finally{
        mongoose.disconnect();
    }
    
}

main();