const handler = async (req, res) => {
  const { queues } = req.app.locals;
  const loggedUser = req.session.user;
  const queuesList = await queues.listDetailed();
  const groupedQueues = queues.filterGroupedQueues(
    queues.groupQueues(queuesList),
    loggedUser.groups
  );
  const queuesData = groupedQueues.map((item) => {
    return {
      group: item.group,
      queues: item.queues.map((queue) => {
        return {
          name: queue.name,
          hostId: queue.hostId,
          jobCounts: queue.jobCounts,
          isPaused: queue.isPaused,
        };
      }),
    };
  });

  return res.status(200).json({
    success: true,
    queues: queuesData,
  });
};

module.exports = handler;