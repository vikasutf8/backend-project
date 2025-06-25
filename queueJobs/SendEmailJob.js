
import { Queue , Worker} from "bullmq";
import { defualtQueueConfig, redisConnection } from "../config/queue.config.js";
import logger from "../config/logger.js";
import { messages } from "@vinejs/vine/defaults";


export const emailQueueName = "email-queue";
export const emailQueue = new Queue(emailQueueName,{
    connection: redisConnection,
    defaultJobOptions: defualtQueueConfig
}); //instance of queue

// workers
export const handler = new Worker(emailQueueName, async (job) => {
    // handling 1000s of mails at once
  console.log("Email Worker is running", job.data);
  
},{connection: redisConnection,});


//worker listensers
handler.on("completed", async (job) => {
    logger.info({job:job,messages:"Email job completed"});
  console.log("Job completed", job.id);
});
handler.on("failed", async (job) => {
    logger.error({job:job,messages:"Email job failed"});
  console.log("Job failed", job.id);
});
handler.on("stalled", async (job) => {
    logger.error({job:job,messages:"Email job stalled"});
  console.log("Job stalled", job.id);
});
handler.on("progress", async (job) => {
    logger.info({job:job,messages:"Email job progress"});
  console.log("Job progress", job.id);
});
handler.on("active", async (job) => {
    logger.info({job:job,messages:"Email job active"});
  console.log("Job active", job.id);
});