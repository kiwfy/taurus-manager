const Bull = require('bull');
const { format } = require('date-fns');
const { getProtectedFields } = require('../../config/jobs');

/**
 * Format all Job date fields.
 * @param {Bull.Job} job
 * @return {Bull.Job} 
 */
const formatDates = (job) => {
  job.timestamp = format(
    job.timestamp,
    'yyyy-MM-dd HH:mm:ss',
  );

  return job;
};

/**
 * Format Job JSON typed fields.
 * @param {Bull.Job} job 
 * @return {Bull.Job}
 */
const formatJsonFields = (job) => {
  job.data = JSON.stringify(job.data, null, 2);

  if (job.logs) {
    job.logs = JSON.stringify(job.logs, null, 2);
  }

  return job;
};

/**
 * Get Job logs.
 * @param {Bull.Queue} queue
 * @param {Bull.Job} job 
 * @return {Bull.Job}
 */
const getJobLogs = async (queue, job) => {
  const logs = await queue.getJobLogs(job.id);
  job.logs = (logs.logs || 'No Logs');

  return job;
}

/**
 * Hide Job protected fields.
 * @param {Bull.Job} job 
 * @return {Bull.Job}
 */
const hideProtectedFields = (job) => {
  const protectedFields = getProtectedFields();

  if (protectedFields) {
    protectedFields.forEach((field) => {
      if (job.data[field]) {
        job.data[field] = "{{PROTECTED CONTENT}}";
      }

      let deep = field.split('.');

      if (deep.length > 1) {
        job.data[deep[0]][deep[1]] = "{{PROTECTED CONTENT}}";
      }
    });
  }

  return job;
};

module.exports = {
  formatDates,
  formatJsonFields,
  getJobLogs,
  hideProtectedFields,
};