const handler = async (req, res) => {
  const { queueHostId, queueName, jobs } = req.body;
  const { queues } = req.app.locals;
  const queue = await queues.get(queueName, queueHostId);

  for (let jobId of jobs) {
    try {
      const job = await queue.getJob(jobId);
      await job.retry();
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err.stack,
      });
    }
  }

  return res.status(200).json({
    success: true,
  });
};

module.exports = handler;