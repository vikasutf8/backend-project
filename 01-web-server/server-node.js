const http  = require('http');
const localhost = '127.0.0.1'

const port =3000

// const server =http.createServer((req,res)=>{

//    if (req.url === '/') {
//      res.statusCode =200;
//      res.setHeader('Content-Type','text/plain');
//      res.end("Hello ice-tea")
//    }else if (req.url === '/ice-tea') {
//     res.statusCode =200;
//     res.setHeader('Content-Type','text/plain');
//     res.end("Choose ice-tea !Thanks")
//   }
//   else{
//     res.statusCode =404;
//     res.setHeader('Content-Type','text/plain');
//     res.end("400 not found")
//   }
// });
//this worst


server.listen(port,localhost,()=>{
    console.log(`Server is listening at http:?//${localhost}:${port}`)
})
