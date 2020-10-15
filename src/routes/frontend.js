const express = require('express');

const router = new express.Router();

const authMiddleware = require('../middlewares/frontend/auth');

const authLogin = require('../controllers/frontend/auth/login');
const authLogout = require('../controllers/frontend/auth/logout');
const queuesList = require('../controllers/frontend/queues/list');
const queuesDetails = require('../controllers/frontend/queues/details');
const jobsList = require('../controllers/frontend/jobs/list');
const jobDetails = require('../controllers/frontend/jobs/details');
const jobsExport = require('../controllers/frontend/jobs/export');
const groupsList = require('../controllers/frontend/groups/list');
const groupDetails = require('../controllers/frontend/groups/details');
const usersList = require('../controllers/frontend/users/list');
const errorsList = require('../controllers/frontend/errors/list');
const errorsJobs = require('../controllers/frontend/errors/jobs');
const usersNew = require('../controllers/frontend/users/new');
const usersEdit = require('../controllers/frontend/users/edit');

router.get('/', authLogin);
router.get('/logout', authLogout);

router.use(authMiddleware);

router.get('/queues', queuesList);
router.get('/queues/:groupName/:queueHostId/:queueName', queuesDetails);
router.get('/queues/:groupName/:queueHostId/:queueName/:queueStatus', jobsList);
router.get('/queues/:groupName/:queueHostId/:queueName/:queueStatus/export', jobsExport);
router.get('/queues/:groupName/:queueHostId/:queueName/:queueStatus/:jobId', jobDetails);

router.get('/groups', groupsList);
router.get('/groups/:groupName', groupDetails);

router.get('/errors', errorsList);
router.get('/errors/:id', errorsJobs);

router.get('/users', usersList);
router.get('/users/new', usersNew);
router.get('/users/:id', usersEdit);

module.exports = router;
