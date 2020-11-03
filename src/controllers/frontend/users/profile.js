const handler = (req, res) => {
  const { user } = req.session;
  const { queues } = req.app.locals;
  const groups = queues.getGroups();

  return res.render('users/profile', {
    loggedUser: user,
    id: user.id,
    user,
    groups,
  });
};

module.exports = handler;