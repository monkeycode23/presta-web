import { AuthSocket } from "../../types/authSocket";

export class ConnectionManager {
  private clients = new Map<string, AuthSocket>();

  add(socket: AuthSocket) {
    const userId = socket.user._id.toString();
    this.clients.set(userId, socket);
  }

  length() {
    return this.clients.size;
  }


  remove(socket: AuthSocket) {
    const userId = socket.user._id.toString();
    this.clients.delete(userId);
  }

  get(userId: string) {
    return this.clients.get(userId);
  }

  all() {
    return this.clients;
  }

  emitTo(userId: string, event: string, data: any) {
    const sock = this.clients.get(userId);
    if (sock) sock.emit(event, data);
  }
}
