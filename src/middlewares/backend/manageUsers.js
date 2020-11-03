module.exports = (req, res, next) => {
  const { user } = req.session;

  if (user.id === req.params.id) {
    return next();
  }

  if (user.permissions.manageUsers) {
    return next();
  }

  return res.status(401).json({
    success: false,
    error: 'Unauthorized!',
  });
};