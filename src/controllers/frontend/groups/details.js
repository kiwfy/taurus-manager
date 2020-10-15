const handler = async (req, res) => {
  const { groupName } = req.params;
  const { queues } = req.app.locals;
  const sortedQueues = await queues.listSorted();
  const queuesList = queues.filter(sortedQueues, { group: groupName });

  return res.render('groups/details', {
    loggedUser: req.session.user,
    groupName,
    queues: queuesList,
  });
};

module.exports = handler;