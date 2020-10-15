const bcrypt = require('bcrypt');
const store = require('../../../utils/store');

const handler = async (req, res) => {
  const { id } = req.params;
  let { name, password, role, groups } = req.body;
  const usersStore = store('src/storage/users');
  const user = usersStore.get(id);

  let hashedPassword = bcrypt.hashSync(password, 8);

  if (bcrypt.compareSync(password, user.password) || password == user.password) {
    hashedPassword = user.password;
  }

  const payload = {
    ...user,
    name,
    password: hashedPassword,
    role,
    groups,
  };

  usersStore.put(id, payload);

  return res.status(200).json({
    success: true,
  });
};

module.exports = handler;