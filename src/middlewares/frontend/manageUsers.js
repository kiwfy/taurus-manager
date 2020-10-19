module.exports = (req, res, next) => {
  const { user } = req.session;

  if (user.permissions.manageUsers) {
    return next();
  }

  return res.redirect('/queues');
};