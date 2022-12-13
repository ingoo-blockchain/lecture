const net = require("net");
const reqParse = require("./lib/req");
const resParse = require("./lib/res");
const port = process.env.SERVER_PORT || 3000;
const host = process.env.SERVER_HOST || "127.0.0.1";

const server = net.createServer((client) => {
  client.setTimeout(500);
  client.setEncoding("utf8");

  client.on("data", (data) => {
    const req = reqParse(data);
    const res = resParse(client);
    if (req.method === "GET" && req.path === "/") {
      console.log(req);
      res.send("<h1>데이터 써볼까아아아?</h1>");
    }
    //express -> ingpress
    if (req.method === "GET" && req.path === "/index.css") {
      // client.write();
    }
  });

  client.on("close", () => {
    console.log("bye bye~");
  });
});

server.on(`error`, (err) => {
  console.log(` err : ${err.code}`);
});

server.listen(port, host, () => {
  console.log(`server listening port ${port}`);
});
