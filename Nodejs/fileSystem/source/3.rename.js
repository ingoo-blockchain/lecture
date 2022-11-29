const fs = require("fs");
const fileName = `rename.txt`;
const updateFileName = `hello.txt`;
console.log(`rename a file`);
fs.rename(fileName, updateFileName, (err) => {
  if (err) return console.error(err);
  console.log(`file renamed successfully.`);
});
