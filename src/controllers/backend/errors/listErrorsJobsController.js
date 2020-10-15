const handler = async (req, res) => {
  let { start, size } = req.query;

  start = parseInt(start);
  size = parseInt(size);
  let end = start + size - 1;

  const errors = [
    {
      id: 100,
      error: 'Cannot connect',
      occurrences: 2,
      ignore: 'no',
    }
  ];

  return res.status(200).json({
    data: errors,
    recordsFiltered: 1,
  });
};

module.exports = handler;