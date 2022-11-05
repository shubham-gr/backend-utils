// Add value (member) to redis set.
const addSetMember = async (client, key, value) => {
  if (!client) throw new Error('Redis client not found');
  try {
    return await client.saddAsync(key, value);
  } catch (error) {
    return error;
  }
};

// get all values (members) of redis set .
const getSetMembers = async (client, key) => {
  if (!client) throw new Error('Redis client not found');
  try {
    return await client.smembersAsync(key);
  } catch (error) {
    return error;
  }
};

// check coming value is member of redis set
const isSetMember = async (client, key, value) => {
  if (!client) throw new Error('Redis client not found');
  try {
    return await client.sismemberAsync(key, value);
  } catch (error) {
    return error;
  }
};

// remove member from redis set
const removeSetMember = async (client, key, value) => {
  if (!client) throw new Error('Redis client not found');
  try {
    return await client.sremAsync(key, value);
  } catch (error) {
    return error;
  }
};

const countSetMember = async (client, key) => {
  if (!client) throw new Error('Redis client not found');
  try {
    return await client.scardAsync(key);
  } catch (error) {
    return error;
  }
};

// set value to normal key
const addKeyValue = async (client, key, value, ttl = null) => {
  if (!client) throw new Error('Redis client not found');
  try {
    if (ttl) return await client.setAsync(key, value, 'ex', ttl);
    return await client.setAsync(key, value);
  } catch (error) {
    return error;
  }
};

// get value of normal key
const getKeyValue = async (client, key) => {
  if (!client) throw new Error('Redis client not found');
  try {
    return await client.getAsync(key);
  } catch (error) {
    return error;
  }
};

// del key from redis
const delKey = async (client, key) => {
  if (!client) throw new Error('Redis client not found');
  try {
    return await client.delAsync(key);
  } catch (error) {
    return error;
  }
};

module.exports = {
  addSetMember,
  getSetMembers,
  removeSetMember,
  countSetMember,
  isSetMember,
  addKeyValue,
  getKeyValue,
  delKey,
};
