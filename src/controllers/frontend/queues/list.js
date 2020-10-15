const handler = async (req, res) => {
  const { queues } = req.app.locals;
  const loggedUser = req.session.user;
  const sortedQueues = await queues.listSorted();
  const groupedQueues = queues.filterGroupedQueues(
    queues.groupQueues(sortedQueues),
    loggedUser.groups
  );

  return res.render('queues/list', {
    loggedUser: req.session.user,
    groupedQueues,
  });
};

module.exports = handler;