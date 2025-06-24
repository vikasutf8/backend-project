git rm -r --cached node_modules .env


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

### Tech
- for validation : vineJs library