const format = (config) => {
  if (config.length === 0) {
    return {};
  }

  const queues = config.split(',');
  const result = {
    queues: [],
  };

  queues.forEach((queue) => {
    const [name, port, host, hostId, group] = queue.split(':');
    result.queues.push({
      name,
      port: Number(port),
      host,
      hostId,
      group,
    });
  });

  return result;
};

module.exports = format(process.env.TAURUS_MANAGER_CONFIG || '');
