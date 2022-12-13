const net = require("net");

const socket = net.connect({ port: 3000, host: "127.0.0.1" });
socket.on("connect", () => {
  console.log(`connected to server!`);
  socket.write("data");
});

socket.on("data", (chunk) => {
  console.log(`received : ${chunk}`);
  socket.end();
});

socket.on("end", () => {
  console.log(`disconnected.`);
});

socket.on("error", (err) => {
  console.log(err);
});

socket.on(`timeout`, () => {
  console.log(`connection timeout.`);
});
