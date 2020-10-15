const handler = async (req, res) => {
  const { queueHostId, queueName } = req.params;
  const { queues } = req.app.locals;
  const queue = await queues.get(queueName, queueHostId);

  return res.render('queues/details', {
    loggedUser: req.session.user,
    queue,
  });
};

module.exports = handler;