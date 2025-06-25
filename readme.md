
## Chalenges faced:
1.Added node_module and env in commit and add . like ..but likelly not pushed : as i have to remove that form my "git add " so try below cmd :- 
git rm -r --cached node_modules .env
and then again commit 

2.Error of Prisma setup as that "primsa client not  initialized "
- resolved via :
// Update your db.config.js file
import { PrismaClient } from '../generated/prisma/index.js';

- As generally or documtation PrismaClient imported from @prisma/client... but here i faced this issue ..so i try this and its working !!!

 


#### prisma:
- npm i prisma @prisma/client
- npx prisma init -y
- Create prisma client common db.config : const prisma =new PrismaClient()
- Create schema at schema.prisma file as single schema always
- npx prisma migrate dev --name "anyrandomnameeverymigration" ?? should migrate always any changes in schema


#### JWT
-these field added in decoded token at authMiddleware and attached req.user
const iat = 1750763623;
const exp = 1750767223;

console.log("Issued at (UTC):", new Date(iat * 1000).toUTCString());
console.log("Expires at (UTC):", new Date(exp * 1000).toUTCString());

#### Pagination 
1. offset pagenation
2. curser pagenation

### Tech

- for validation : vineJs library
- File handling : ThunderClient extension not support file upload at based form ..its need paid version of that
    - ApiTransform or DTO(springBoot) ..what we have to show in response
-  helmet and cors
- rate limiting :express-rate-limit :-ddos attack protection 
- caching : redis :- 
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
http://localhost:8001/redis-stack/browser
