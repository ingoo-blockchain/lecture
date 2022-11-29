const fs = require("fs");
const path = require("path");
const buf = Buffer.alloc(1024);
const fileName = `input.txt`;
const filePath = path.join(__dirname, fileName);

console.log(`open ${fileName} file`);
fs.open(fileName, `r+`, (err, fd) => {
  if (err) return console.error(err);
  console.log(`open ${filePath} file success!!!!`);
  console.log(`truncate file after 20bytes`);

  let len = 20;
  fs.ftruncate(fd, len, (err) => {
    if (err) return console.error(err);

    console.log(`file truncate success`);
    console.log(`reading file`);

    fs.read(fd, buf, 0, buf.length, 0, (err, bytes, databuf) => {
      if (bytes > 0) {
        console.log(buf.slice(0, bytes).toString());
        console.log(`bytes : ${bytes}`);
        console.log(`databuf : ${databuf}`);
        console.log(`buf : ${buf}`);
      }

      fs.close(fd, (err) => {
        if (err) return console.error(err);
        console.log(`file closed`);
      });
    });
  });
});
