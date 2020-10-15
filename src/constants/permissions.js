module.exports = {
  admin: {
    pauseQueue: true,
    manageUsers: true,
    addJobs: true,
    retryJobs: true,
    removeJobs: true,
  },
  controller: {
    pauseQueue: true,
    manageUsers: false,
    addJobs: true,
    retryJobs: true,
    removeJobs: false,
  },
  reader: {
    pauseQueue: false,
    manageUsers: false,
    addJobs: false,
    retryJobs: false,
    removeJobs: false,
  },
};
