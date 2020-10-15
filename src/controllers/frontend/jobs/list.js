const handler = async (req, res) => {
  const { groupName, queueHostId, queueName, queueStatus } = req.params;
  
  return res.render('jobs/list', {
    loggedUser: req.session.user,
    groupName,
    queueName,
    queueHostId,
    queueStatus,
  });
};

module.exports = handler;