const express = require('express');

const router = new express.Router();

const backendRoutes = require('./backend');
const frontendRoutes = require('./frontend');

router.use('/backend', backendRoutes);
router.use('/', frontendRoutes);

router.use((_, res) => {
  res.status(404);
  res.render('404', {
    layout: 'blank',
  });
});

module.exports = router;
