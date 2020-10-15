module.exports = (req, res, next) => {
  if (req.session.logged) {
    return next();
  }

  return res.status(401).json({
    error: 'Unauthorized!',
  });
};