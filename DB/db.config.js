
// import pkg from '@prisma/client';
// const { PrismaClient } = pkg;



// const  prisma =new PrismaClient({
//     log:["query","error"]
// });

// export default prisma

// Update your db.config.js file
import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient({
    log: ["query", "error"]
});

export default prisma;