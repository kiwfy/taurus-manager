module.exports = (req, res, next) => {
  const { user } = req.session;

  if (user.permissions.pauseQueue) {
    return next();
  }

  return res.status(401).json({
    success: false,
    error: 'Unauthorized!',
  });
};