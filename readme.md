# Robust Backend
? what is web server -- a server is just piece of software whose duty is just to serve.

? JS -- browser lang. 

**# always response return/send with statusCode **

### bun:
```
import {serve}from 'bun' 
Bun.serve({
  fetch(req) {
    return new Response("Bun!");
  },
});
```
? when we are deploying an application supporting system having node install can we use node bun server ?
---

