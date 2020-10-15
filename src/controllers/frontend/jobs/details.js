const {
  formatDates,
  formatJsonFields,
  getJobLogs,
  hideProtectedFields
} = require('../../../utils/helpers/jobs-helpers');

const handler = async (req, res) => {
  const {
    groupName,
    queueHostId,
    queueName,
    queueStatus,
    jobId,
  } = req.params;
  const { queues } = req.app.locals;
  const queue = await queues.get(queueName, queueHostId);

  let job = await queue.getJob(jobId);
  job = formatDates(job);
  job = await getJobLogs(queue, job);
  job = hideProtectedFields(job);
  job = formatJsonFields(job);
  job.isFailed = queueStatus === 'failed';
  
  return res.render('jobs/details', {
    loggedUser: req.session.user,
    groupName,
    queueName,
    queueHostId,
    queueStatus,
    job,
  });
};

module.exports = handler;