const handler = async (req, res) => {
  const { queues: queuesList } = req.body;
  const { queues } = req.app.locals;

  for (let { name, hostId } of queuesList) {
    try {
      const queue = await queues.get(name, hostId);
      await queue.pause();
    } catch (err) {
      res.status(500).json({
        success: false,
        error: err.stack, 
      });
    }
  }

  return res.status(200).json({
    success: true,
  });
};

module.exports = handler;