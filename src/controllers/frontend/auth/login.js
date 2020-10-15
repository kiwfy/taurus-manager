const handler = (_, res) => {
  return res.render('auth/login', {
    layout: 'auth',
  });
};

module.exports = handler;