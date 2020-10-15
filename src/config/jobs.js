module.exports = {
  getProtectedFields: () => {
    const fields = process.env.TAURUS_MANAGER_PROTECTED_FIELDS || '';
    return fields.split(',');
  },
};
