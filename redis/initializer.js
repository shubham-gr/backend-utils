const ASYNC = require('async');
const Q = require('q');

// It's a hack to use same connection multiple time.
const redis = {};

function initializeGlobalRedis(callback) {
  require('./index').redisConnection(process.env.REDIS_GLOBAL_CLIENT_URL, null, function (
    error,
    connection
  ) {
    if (error) {
      throw error;
    }
    redis.connection = connection;
    callback();
  });
}

function init() {
  const deferred = Q.defer();
  ASYNC.waterfall([initializeGlobalRedis], function (error, result) {
    if (error) deferred.reject(error);
    else deferred.resolve(result);
  });
  return deferred.promise;
}

module.exports = {
  redis,
  init,
};
