const REDIS = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(REDIS);

function connection(redisURI, logger, callback) {
  logger = logger || function () {};

  const redisUserClient = REDIS.createClient(redisURI);

  redisUserClient.on('error', function (error) {
    if (callback) return callback(error);
    throw error;
  });

  redisUserClient.on('connect', function () {
    if (callback) callback(null, redisUserClient);
  });

  return redisUserClient;
}

module.exports = connection;
