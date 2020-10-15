const _ = require('lodash');
const Bull = require('bull');
const Ulid = require('ulid');

/**
 * Class for managing queues.
 */
class Queues {
  /**
   * Class constructor.
   * @param {Object} config 
   */
  constructor(config) {
    this.setConfig(config);
  }

  /**
   * Get queue by its name and host.
   * 
   * @param {String} name
   * @param {String} hostId
   * @return {Bull.Queue}
   */
  async get(name, hostId) {
    const queueConfig = _.find(this.config.queues, {
      name,
      hostId,
    });

    if (!queueConfig) {
      return null;
    }

    const {port, host, group} = queueConfig;
    const queue = new Bull(name, {
      redis: {
        host,
        port,
      },
    });

    queue.hostId = hostId;
    queue.group = group;
    queue.jobCounts = await queue.getJobCounts();
    queue.isPaused = (await queue.client.get(`${hostId}:${name}:meta-paused`)) == '1';

    return queue;
  }

  /**
   * Check whether a queue is paused or not.
   * 
   * @param {Bull.Queue} queue
   * @param {String} name
   * @param {String} hostId
   * @return {Boolean}
   */
  async isPaused(queue, name, hostId) {
    const metaPausedValue = await queue.client.get(
      `${hostId}:${name}:meta-paused`
    );

    return metaPausedValue == '1';
  }

  /**
   * List all queues.
   * 
   * @return {Object}
   */
  list() {
    return this.config.queues;
  }

  /**
   * List sorted queues.
   * 
   * @return {Array}
   */
  async listSorted() {
    const queues = [];

    for (const { name, hostId } of this.config.queues) {
      queues.push(await this.get(name, hostId));
    }

    return _.orderBy(queues, ['jobCounts.failed', 'jobCounts.waiting'], ['desc', 'desc']);
  }

  /**
   * Filter queues by predicate.
   * 
   * @param {Array} queuesList
   * @param {Object} predicate
   * @return {Array}
   */
  filter(queuesList, predicate) {
    return _.filter(queuesList, predicate);
  }

  /**
   * Filter grouped queues.
   * 
   * @param {Array} queues
   * @param {Array} groups
   * @return {Array}
   */
  filterGroupedQueues(queues, groups) {
    return queues.filter((queue) => groups.includes(queue.group));
  }

  /**
   * Get groups.
   * 
   * @return {Array}
   */
  getGroups() {
    return _.uniq(_.map(this.config.queues, 'group'));
  }

  /**
   * Group queues.
   * 
   * @param {Array} queuesList
   * @return {Object}
   */
  groupQueues(queuesList) {
    const groups = _.uniq(_.map(queuesList, 'group'));
    const groupedQueues = [];

    for (const group of groups) {
      groupedQueues.push({
        group,
        queues: _.filter(queuesList, {group}),
      });
    }
    
    return groupedQueues;
  }

  /**
   * Create and add job to queue.
   * 
   * @param {Bull.Queue} queue
   * @param {Object} data
   * @return {any}
   */
  set(queue, data) {
    const params = [
      'process',
      data,
      {
        jobId: Ulid.ulid(),
        removeOnComplete: false,
        removeOnFail: false,
      },
    ];

    return queue.add.apply(queue, params);
  }

  /**
   * Set queue config.
   * 
   * @param {Object} config
   */
  setConfig(config) {
    this.config = config;
  }
}

module.exports = Queues;