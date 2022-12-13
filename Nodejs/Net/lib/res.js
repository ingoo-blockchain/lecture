const responseTemplate = (content) => {
  const body = Buffer.from(content);
  return `HTTP/1.1 200 OK
Connection: Keep-Alive
Keep-Alive:timeout=5
Content-type: text/html; charset=UTF-8
Content-length: ${body.length}

${body.toString()}`;
};

module.exports = (client, req) => {
  return {
    send: (body) => {
      const response = responseTemplate(body);
      client.write(response);
    },
    sendFile: (filePath) => {},
    redirect: () => {},
  };
};
