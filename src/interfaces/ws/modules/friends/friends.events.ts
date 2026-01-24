export default function registerFriendsEvents(io, socket, connections) {
  socket.on("message:send", async (payload) => {
    // lógica…
  });

  socket.on("message:read", async (payload) => {
    // lógica…
  });

}
  
    /*     this.socket.on("friend-request",this.friendRequest.bind(this));
        this.socket.on("accept-friend-request",this.friendRequest.bind(this));
        this.socket.on("disconnect",this.onUserDisconnected.bind(this));
}
 */