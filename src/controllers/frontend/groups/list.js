const handler = async (req, res) => {
  const { queues } = req.app.locals;
  const loggedUser = req.session.user;
  const sortedQueues = await queues.listSorted();
  const groupedQueues = queues.filterGroupedQueues(
    queues.groupQueues(sortedQueues),
    loggedUser.groups
  );
  
  for (const group of groupedQueues) {
    group.queuesCounts = group.queues.length;
  }

  return res.render('groups/list', {
    loggedUser,
    groupedQueues,
  });
};

module.exports = handler;