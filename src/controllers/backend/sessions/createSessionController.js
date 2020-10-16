const store = require('../../../utils/store');
const permissions = require('../../../constants/permissions');

const handler = async (req, res) => {
  const { username, password } = req.body;
  const usersStore = store('src/storage/users');
  const data = usersStore.store;
  const keys = Object.keys(data);

  for (const key of keys) {
    const user = data[key];
    
    if (user.username == username && user.password == password) {
      req.session.logged = true;
      user.id = key;
      user.permissions = permissions[user.role];
      delete user.password;
      req.session.user = user;
      
      return res.status(200).json({
        success: true,
        data: 'queues',
      });
    }
  }

  return res.status(401).json({
    error: 'User not found!',
  });
};

module.exports = handler;