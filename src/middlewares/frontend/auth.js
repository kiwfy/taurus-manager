module.exports = (req, res, next) => {
  if (req.session.logged) {
    return next();
  }

  return res.redirect('/');
};