const store = require('../../../utils/store');

const handler = (req, res) => {
  const { id } = req.params;
  const { queues } = req.app.locals;
  const groups = queues.getGroups();
  const usersStore = store('src/storage/users');
  const user = usersStore.get(id);
  user.id = id;

  return res.render('users/form', {
    loggedUser: req.session.user,
    id,
    user,
    groups,
  });
};

module.exports = handler;