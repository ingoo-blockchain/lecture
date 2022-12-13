const fs = require("fs");

fs.readFile(`./README.md`, (err, data) => {
  if (err) throw err;

  console.log(data);
});
