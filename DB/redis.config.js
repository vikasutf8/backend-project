

import redis from "express-redis-cache";


const redisCache = redis({
  host: "localhost",
  port: 6379,
  prefix:"master_backend",
  expire: 60 * 60 * 24 , // 1 day
  keyPrefix: "cache:",
});

export default redisCache;

