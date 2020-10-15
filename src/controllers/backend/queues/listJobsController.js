const { capitalize } = require('lodash');
const { formatDates } = require('../../../utils/helpers/jobs-helpers');

const handler = async (req, res) => {
  const { queueHostId, queueName, queueStatus } = req.params;
  let { start, size } = req.query;
  const { queues } = req.app.locals;
  const queue = await queues.get(queueName, queueHostId);

  start = parseInt(start);
  size = parseInt(size);
  let end = start + size - 1;

  const jobsCounts = await queue.getJobCounts();
  const jobs = await queue[`get${capitalize(queueStatus)}`](start, end);
  const formattedJobs = [];

  for (let job of jobs) {
    job = formatDates(job);
    formattedJobs.push({
      id: job.id,
      name: job.name,
      attempts: job.attemptsMade,
      time: job.timestamp,
    });
  }

  return res.status(200).json({
    data: formattedJobs,
    recordsFiltered: jobsCounts[queueStatus],
  });
};

module.exports = handler;