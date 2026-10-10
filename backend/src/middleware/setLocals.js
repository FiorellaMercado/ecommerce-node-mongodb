function setLocal(req, res, next){
    res.locals.adminId = req.session.adminId;
    next();
}

module.exports = setLocal