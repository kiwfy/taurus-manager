const { capitalize } = require('lodash');

const handler = async (req, res) => {
  const { queueHostId, queueName, queueStatus } = req.params;
  const { queues } = req.app.locals;
  const queue = await queues.get(queueName, queueHostId);

  let jobs = await queue[`get${capitalize(queueStatus)}`](0, 1000);
  jobs = jobs.map((job) => job.toJSON());

  const filename = `${queueName}-${queueStatus}-dump.json`;

  res.setHeader('Content-disposition', `attachment; filename=${filename}`);
  res.setHeader('Content-type', 'application/json');
  res.write(JSON.stringify(jobs, null, 2), () => res.end());
};

module.exports = handler;