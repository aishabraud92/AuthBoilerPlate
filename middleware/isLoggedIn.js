module.exports = function(req, res, next){
  if(!req.user){
    req.flash('error', 'you must be logged in to see this page');
    re.redirect('/auth/login');
  }
  else {
    next();
  }
}
