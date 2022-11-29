const fs = require("fs");
const dirName = "newFolder";
const path = require("path");
const dirPath = path.join(__dirname, dirName);

fs.mkdir(dirPath, (err) => {
  if (err) throw err;
  console.log(`create directory successfully`);
});
