const Ulid = require('ulid');
const store = require('../../../utils/store');

const handler = async (req, res) => {
  const { name, username, password, role, groups } = req.body;
  const id = Ulid.ulid();
  const usersStore = store('src/storage/users');
  const data = usersStore.store;
  const keys = Object.keys(data);

  for (const key of keys) {
    const user = data[key];
    if (user.username == username) {
      return res.status(400).json({
        success: false,
        error: 'This username already exists!',
      });
    }
  }

  const payload = {
    name,
    username,
    password,
    role,
    groups,
  };

  usersStore.put(id, payload);

  return res.status(200).json({
    success: true,
  });
};

module.exports = handler;