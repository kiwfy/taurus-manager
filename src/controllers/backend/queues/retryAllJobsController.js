const { capitalize } = require('lodash');

const handler = async (req, res) => {
  const { queueHostId, queueName, queueStatus } = req.body;
  const { queues } = req.app.locals;
  const queue = await queues.get(queueName, queueHostId);
  
  let start = 0;
  let end = 99;

  while (true) {
    const jobs = await queue[`get${capitalize(queueStatus)}`](start, end);
    
    if (!jobs || jobs.length === 0) {
      break;
    }

    for (const job of jobs) {
      await job.retry();
    }

    start += 100;
    end += 100;
  }

  return res.status(200).json({
    success: true,
  });
};

module.exports = handler;