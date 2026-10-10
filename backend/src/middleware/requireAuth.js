function requireAuth(req, res, next) {
    if (!req.session.adminId) return res.redirect('/login');
    next();
};

module.exports=requireAuth