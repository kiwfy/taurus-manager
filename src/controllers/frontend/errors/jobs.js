const handler = async (req, res) => {
  const { queues } = req.app.locals;

  return res.render('errors/jobs', {
    loggedUser: req.session.user,
  });
};

module.exports = handler;