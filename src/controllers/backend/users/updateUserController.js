const store = require('../../../utils/store');

const handler = async (req, res) => {
  const { id } = req.params;
  const { name, password, role, groups } = req.body;
  const usersStore = store('src/storage/users');
  const user = usersStore.get(id);

  const payload = {
    ...user,
    name,
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