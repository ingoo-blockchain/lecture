const net_server = require("net");
const port = 3001;

const body = Buffer.from("<h1>Hello World!</h1>");
const response = `HTTP/1.1 200 Ok
ETag: W/"15-JH0CYhkE2Hq4BeQ38zxdA7mg3pE"
Date: Tue, 29 Nov 2022 07:26:46 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Content-type: ${body.length}

${body}
`;

const server = net_server.createServer((client) => {
  client.setEncoding("utf8");

  client.on("data", (data) => {
    console.log(data);

    client.write(response);
    client.end();
  });
});

server.on("error", (err) => {
  console.log(`err: ${err.code}`);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`server listening port ${port}`);
});
