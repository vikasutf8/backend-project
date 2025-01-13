import {serve} from 'bun'
import { hostname } from 'os'

serve({
    fetch(request){
        const url =new URL(request.url) //destructring url
        if(url.pathname === '/'){
            return new Response('Heello Ice=-bun-tead',{status :200})
        }
        else if(url.pathname === '/ice-bun'){
            return new Response('thanks Ice=-bun-tead',{status :200})
        }
        else{
            return new Response("not Found",{status:404})
        }
    },
    port :3000,
    hostname :'127.0.0.1'
})