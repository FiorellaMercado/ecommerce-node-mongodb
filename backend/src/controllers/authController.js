const Admin = require('../models/Admin')
const bcrypt =require('bcrypt')

const showLogin=(req,res)=>{
    res.render('login')
}

const login=async (req,res, next)=>{
    const email=(req.body['email'] || '').toLowerCase().trim()
    const password= req.body['password']

    if (!email || !password){
        return res.render('login', {error:"Credenciales invalidas"});
    }

    const admin=await Admin.findOne({email}).select('+passwordHash');

    if (!admin || !await bcrypt.compare(password, admin.passwordHash)){
        return  res.render('login', {error:"Credenciales invalidas"});
    }

    req.session.regenerate((err) => {
        if (err) return next(err);
        req.session.adminId = admin._id;
        res.redirect('/productos');
    });
}

const logout = async (req,res,next)=>{
    req.session.destroy((err)=> {
        if(err) return next(err);
        res.clearCookie('penguin.sid');
        res.redirect('/login')
    });
}


module.exports= {login,logout,showLogin};