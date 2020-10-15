const handler = async (req, res) => {
  const { queueHostId, queueName, data } = req.body;
  const { queues } = req.app.locals;
  const queue = await queues.get(queueName, queueHostId);

  try {
    await queues.set(queue, data);
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }

  return res.status(200).json({
    success: true,
  });
};

module.exports = handler;