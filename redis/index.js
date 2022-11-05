const redisConnection = require('./connection');

module.exports = {
  redisConnection: require('./connection'),
  redisUtil: require('./redis.utils'),
  globalClient: new redisConnection(process.env.REDIS_GLOBAL_CLIENT_URL),
};
