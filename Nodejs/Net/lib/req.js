// const req = `GET / HTTP/1.1
// content-length: 87
// accept-encoding: gzip, deflate, br
// Accept: */*
// User-Agent: Thunder Client (https://www.thunderclient.com)
// Content-Type: application/json
// Host: localhost:3000
// Connection: close

// {
//     "name": "mac m1",
//     "description": "programing...computer",
//     "price": 110
// }`;

module.exports = (req) => {
  const arr = req.split("\r\n");

  let line = false;
  let body = "";
  let message = [];
  for (const key in arr) {
    if (arr[key] === "") line = true;
    if (line) body += arr[key].replaceAll(" ", "");
    else message.push(arr[key]);
  }

  const request = message.reduce((acc, value, index, arr) => {
    if (index === 0) {
      const [method, url, version] = value.split(" ");
      const [path, query] = url.split("?");

      acc.method = method;
      acc.path = path;
      acc.version = version;
      acc.query = query
        .split("&")
        .map((v) => v.split("="))
        .reduce((acc, value) => {
          acc[value[0]] = value[1];
          return acc;
        }, {});
        
      return acc;
    }

    const [key, val] = value.split(":");
    acc.headers = {
      ...acc.headers,
      [key]: val.replaceAll(" ", ""),
    };
    return acc;
  }, {});
  const ContentType = request.headers["Content-Type"];
  if (
    ContentType !== undefined &&
    ContentType.indexOf("application/json") === 0
  ) {
    body = JSON.parse(body);
  }

  if (
    ContentType !== undefined &&
    ContentType.indexOf("application/x-www-form-urlencoded") === 0
  ) {
    body = body
      .split("&")
      .map((v) => v.split("="))
      .reduce((acc, value) => {
        acc[value[0]] = value[1];
        return acc;
      }, {});
  }

  return { ...request, body };
};
