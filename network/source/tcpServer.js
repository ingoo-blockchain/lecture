const net_server = require("net");

const server = net_server.createServer((client) => {
  console.log("Client connection: ");
  console.log("   local = %s:%s", client.localAddress, client.localPort);
  console.log("   remote = %s:%s", client.remoteAddress, client.remotePort);

  client.setTimeout(500);
  client.setEncoding("utf8");

  client.on("data", function (data) {
    console.log(
      "Received data from client on port %d: %s",
      client.remotePort,
      data.toString()
    );

    writeData(client, "Sending: " + data.toString());
    console.log("  Bytes sent: " + client.bytesWritten);
  });

  client.on("end", function () {
    console.log("Client disconnected");
  });

  client.on("error", function (err) {
    console.log("Socket Error: ", JSON.stringify(err));
  });

  client.on("timeout", function () {
    console.log("Socket Timed out");
  });
});

server.listen(9090, function () {
  console.log("Server listening: " + JSON.stringify(server.address()));
  server.on("close", function () {
    console.log("Server Terminated");
  });
  server.on("error", function (err) {
    console.log("Server Error: ", JSON.stringify(err));
  });
});

function writeData(socket, data) {
  var success = socket.write(data);
  if (!success) {
    console.log("Client Send Fail");
  }
}
