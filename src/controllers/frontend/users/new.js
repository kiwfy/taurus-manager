const handler = (req, res) => {
  const { queues } = req.app.locals;
  const groups = queues.getGroups();

  return res.render('users/form', {
    loggedUser: req.session.user,
    groups,
  });
};

module.exports = handler;