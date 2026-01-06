import { Server } from "socket.io";
import { authMiddleware } from "./AuthMiddleware";
import { ConnectionManager } from "./ConnectionManager";
import registerUsersEvents from "../modules/users/user.events";
/* import registerMessagesEvents from "../modules/messages/message.events";
import registerFriendsEvents from "../modules/friends/friends.events";
import registerCallsEvents from "../modules/calls/calls.evetns"; */
import { AuthSocket } from "../../types/authSocket";
import registerMatchMakingEvents from "../modules/matchmakng/matchmakin.events";
export class SocketServer {
  private io: Server;
  private connections: ConnectionManager;

  constructor(io: Server) {
    this.io = io;
    this.connections = new ConnectionManager();
  }

  init() {

    
    this.io.use(async(socket,next)=>await authMiddleware(socket as AuthSocket,next));

    this.io.on("connection", (socket) => {
      const  authSocket = socket as AuthSocket
      
      console.log("client conencted ",authSocket.user._id)
      console.log("total clients",this.connections.length())
      
      this.connections.add(authSocket);
      // Registrar eventos de cada módulo
      registerUsersEvents({io:this.io,socket: authSocket,connections: this.connections});
   /*    registerMessagesEvents(this.io, socket, this.connections);
      registerFriendsEvents(this.io, socket, this.connections);
      registerCallsEvents(this.io, socket, this.connections); */
      registerMatchMakingEvents({io:this.io,socket: authSocket,connections: this.connections})
      
      
      
      
      socket.on("disconnect", () => {
        this.connections.remove(authSocket);
      });
    });
  }
}
