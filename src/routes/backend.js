const express = require('express');

const router = new express.Router();

const authMiddleware = require('../middlewares/backend/auth');
const pauseQueueMiddleware = require('../middlewares/backend/pauseQueue');
const addJobsMiddleware = require('../middlewares/backend/addJobs');
const retryJobsMiddleware = require('../middlewares/backend/retryJobs');
const removeJobsMiddleware = require('../middlewares/backend/removeJobs');
const manageUsersMiddleware = require('../middlewares/backend/manageUsers');

const createSessionController =
  require('../controllers/backend/sessions/createSessionController');
const createJobController =
  require('../controllers/backend/queues/createJobController');
const listJobsController =
  require('../controllers/backend/queues/listJobsController');
const listQueuesController =
  require('../controllers/backend/queues/listQueuesController');
const pauseQueuesController =
  require('../controllers/backend/queues/pauseQueuesController');
const resumeQueuesController =
  require('../controllers/backend/queues/resumeQueuesController');
const cloneJobsController =
  require('../controllers/backend/queues/cloneJobsController');
const removeJobsController =
  require('../controllers/backend/queues/removeJobsController');
const retryJobsController =
  require('../controllers/backend/queues/retryJobsController');
const retryAllJobsController =
  require('../controllers/backend/queues/retryAllJobsController');
const createUserController =
  require('../controllers/backend/users/createUserController');
const updateUserController =
  require('../controllers/backend/users/updateUserController');
const removeUserController =
  require('../controllers/backend/users/removeUserController');
const listErrorsController =
  require('../controllers/backend/errors/listErrorsController');
const listErrorsJobsController =
  require('../controllers/backend/errors/listErrorsJobsController');

router.post('/sessions', createSessionController);

router.use(authMiddleware);

router.get('/queues', listQueuesController);
router.get(
    '/queues/:queueHostId/:queueName/:queueStatus/jobs',
    listJobsController,
);
router.post('/queues/resume', pauseQueueMiddleware, resumeQueuesController);
router.post('/queues/pause', pauseQueueMiddleware, pauseQueuesController);
router.post('/queues/jobs', addJobsMiddleware, createJobController);
router.post('/queues/jobs/clone', retryJobsMiddleware, cloneJobsController);
router.post('/queues/jobs/retry', retryJobsMiddleware, retryJobsController);
router.post('/queues/jobs/retry-all', retryJobsMiddleware, retryAllJobsController);
router.post('/queues/jobs/remove', removeJobsMiddleware, removeJobsController);

router.post('/users', manageUsersMiddleware, createUserController);
router.put('/users/:id', manageUsersMiddleware, updateUserController);
router.delete('/users/:id', manageUsersMiddleware, removeUserController);

router.get('/errors', listErrorsController);
router.get('/errors/:id/jobs', listErrorsJobsController);

module.exports = router;
