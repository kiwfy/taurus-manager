const handler = async (req, res) => {
  const { queues } = req.app.locals;
  const loggedUser = req.session.user;
  const queuesList = await queues.listDetailed();
  const groupedQueues = queues.filterGroupedQueues(
    queues.groupQueues(queuesList),
    loggedUser.groups
  );

  return res.render('queues/table', {
    loggedUser: req.session.user,
    groupedQueues,
  });
};

module.exports = handler;