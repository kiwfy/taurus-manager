const express = require('express');

const router = new express.Router();

const authMiddleware =
  require('../middlewares/backend/auth');
const createSessionController =
  require('../controllers/backend/sessions/createSessionController');
const createJobController =
  require('../controllers/backend/queues/createJobController');
const listJobsController =
  require('../controllers/backend/queues/listJobsController');
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

router.get(
  '/queues/:queueHostId/:queueName/:queueStatus/jobs',
  listJobsController
);
router.post('/queues/resume', resumeQueuesController);
router.post('/queues/pause', pauseQueuesController);
router.post('/queues/jobs', createJobController);
router.post('/queues/jobs/clone', cloneJobsController);
router.post('/queues/jobs/remove', removeJobsController);
router.post('/queues/jobs/retry', retryJobsController);
router.post('/queues/jobs/retry-all', retryAllJobsController);

router.post('/users', createUserController);
router.put('/users/:id', updateUserController);
router.delete('/users/:id', removeUserController);

router.get('/errors', listErrorsController);
router.get('/errors/:id/jobs', listErrorsJobsController);

module.exports = router;
