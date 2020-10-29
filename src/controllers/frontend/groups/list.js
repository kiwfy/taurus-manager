const handler = async (req, res) => {
  const { queues } = req.app.locals;
  const loggedUser = req.session.user;
  const queuesList = await queues.listDetailed();
  const groupedQueues = queues.filterGroupedQueues(
    queues.groupQueues(queuesList),
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