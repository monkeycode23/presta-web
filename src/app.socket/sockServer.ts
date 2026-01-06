
import  {Server as Sock} from 'socket.io'
import http from "http";

import { SocketServer as SockServer } from "./core/SocketServer";




class SocketServer{

    private server:any
    private SERVER_PORT = process.env.SOCK_SERVER_PORT  ?? 2567;
    private SERVER_DOMINE = process.env.SOCK_SEVER_DOMINE ?? "localhost"
    private SERVER_PROTOCOL = process.env.SOCK_SEVER_PROTOCOL ?? "ws"


    constructor(app:any){
        this.server = http.createServer(app);
    }
    

    init(){

        
        const appSocket = new SockServer(new Sock(this.server, {
          transports:["websocket"],
          
          cors: {
            origin: function (origin, callback) {
              const allowedOrigins = [process.env.CLIENT_URL || "http://localhost:3000","http://localhost:5173","http://localhost:3001", "http://localhost:3005", "http://localhost:3006"]
              
              if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
              } else {
                callback(new Error("No permitido por CORS"));
              }
            }, 
            methods: ["GET", "POST"]
          } 
        })) 
        
        
        appSocket.init()
        
        
        // Arrancar servidor
        
        
       
        
    }


    listen(){
         this.server.listen(this.SERVER_PORT, () => {
          console.log(`🚀 app socket escuchando en ws://localhost:${this.SERVER_PORT}`);
        });
    }
}


export default SocketServer 