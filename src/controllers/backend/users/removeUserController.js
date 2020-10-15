const store = require('../../../utils/store');

const handler = async (req, res) => {
  const { id } = req.params;
  const usersStore = store('src/storage/users');
  usersStore.remove(id);

  return res.status(200).json({
    success: true,
  });
};

module.exports = handler;