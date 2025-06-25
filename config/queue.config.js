
export const redisConnection ={
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    // password: process.env.REDIS_PASSWORD,   
}

export const defualtQueueConfig={
        delay:5000,
        removeOnComplete:{
            count:10,
            age:60*60
        },
        attempts:3,
        backoff:{
            type:"exponential",
            delay:1000
        },
        removeOnFail:{
            count:100,
        }

    }

