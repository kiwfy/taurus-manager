const Ulid = require('ulid');
const bcrypt = require('bcrypt');
const store = require('../../../utils/store');

const handler = async (req, res) => {
  const { name, email, password, role, groups } = req.body;
  const id = Ulid.ulid();
  const usersStore = store('src/storage/users');
  const payload = {
    name,
    email,
    password: bcrypt.hashSync(password, 8),
    role,
    groups,
  };

  usersStore.put(id, payload);

  return res.status(200).json({
    success: true,
  });
};

module.exports = handler;