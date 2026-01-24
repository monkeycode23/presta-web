import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { ApiServer } from "./interfaces/http/ApiServer";
import { WebSocketServer } from "./interfaces/ws/websocket.server";


import  {Server as Sock} from 'socket.io'
import http from "http";

import { SocketServer as SockServer } from "@/interfaces/ws/core/SocketServer";




const PORT = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 5000;
const SERVER_DOMAIN = process.env.SERVER_DOMAIN || 'http://localhost';

const apiServer = new ApiServer(PORT, SERVER_DOMAIN, express());

apiServer.init();


const server = http.createServer(apiServer.getExpressServer());

const socketIo = new SockServer(new Sock(server, {
          transports:["websocket"],
          
/*           cors: {
            origin: function (origin, callback) {
              const allowedOrigins = [process.env.CLIENT_URL || "http://localhost:3000","http://localhost:5173","http://localhost:3001", "http://localhost:3005", "http://localhost:3006"]
              
              if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
              } else {
                callback(new Error("No permitido por CORS"));
              }
            }, 
            methods: ["GET", "POST"]
          } */ 
        })) 
        
        socketIo.init()


server.listen(PORT, () => {
  console.log(`🚀 app socket escuchando en ws://localhost:${PORT}`);
});




import { connectToDatabase } from "./infrastructure/database/mongo/connection";

connectToDatabase();