const store = require('../../../utils/store');

const handler = (req, res) => {
  const usersStore = store('src/storage/users');
  const data = usersStore.store;
  const keys = Object.keys(data);
  const users = [];

  keys.forEach((key) => {
    let user = data[key];
    user.id = key;
    delete user.password;
    
    users.push(user);
  });

  return res.render('users/list', {
    loggedUser: req.session.user,
    users,
  });
};

module.exports = handler;