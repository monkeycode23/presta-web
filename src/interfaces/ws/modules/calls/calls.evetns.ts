export default function registerCallsEvents(io, socket, connections) {
  socket.on("message:send", async (payload) => {
    // lógica…
  });

  socket.on("message:read", async (payload) => {
    // lógica…
  });
}
