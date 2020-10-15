const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const hbs = require('express-hbs');
const fp = require('path');

require('./utils/helpers/hbs-helpers')(hbs);

const Queues = require('./utils/queues');
const queuesConfig = require('./config/queues');
const routes = require('./routes');

const app = express();
const queues = new Queues(queuesConfig);

app.locals.api = require('./utils/api');
app.locals.baseUrl = process.env.TAURUS_MANAGER_BASE_URL || '';
app.locals.queues = queues;

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));
app.use(bodyParser.json());
app.use(express.static(fp.join(__dirname, '../public')));
app.engine('hbs', hbs.express4({
  partialsDir: [
    fp.join(__dirname, 'views/partials'),
  ],
  layoutsDir: fp.join(__dirname, 'views/layout'),
  defaultLayout: fp.join(__dirname, 'views/layout/default.hbs'),
}));
app.set('view engine', 'hbs');
app.set('views', fp.join(__dirname, 'views'));
app.use(routes);

module.exports = app;
