const handler = (req, res) => {
  req.session.destroy();
  return res.redirect('/');
};

module.exports = handler;