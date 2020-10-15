const handler = async (req, res) => {
  const { queues } = req.app.locals;

  return res.render('errors/list', {
    loggedUser: req.session.user,
  });
};

module.exports = handler;