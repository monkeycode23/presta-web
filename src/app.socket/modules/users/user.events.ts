import { Server } from "socket.io";
import { AuthSocket } from "../../../types/authSocket";
import { ConnectionManager } from "../../core/ConnectionManager";

interface IRegisterEvents {
  io: Server;
  socket: AuthSocket;
  connections: ConnectionManager;
}

export default function registerMessageEvents({
  io,
  socket,
  connections,
}: IRegisterEvents) {

  socket.on("message:send", async (payload: any) => {
    // lógica...
  });

  socket.on("message:read", async (payload: any) => {
    // lógica...
  });
}
