const handler = async (req, res) => {
  const { groupName } = req.params;
  const { queues } = req.app.locals;
  const queuesList = await queues.listDetailed();
  const filteredQueues = queues.filter(queuesList, { group: groupName });

  return res.render('groups/table', {
    loggedUser: req.session.user,
    groupName,
    queues: filteredQueues,
  });
};

module.exports = handler;