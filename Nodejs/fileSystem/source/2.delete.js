const fs = require("fs");
const path = require("path");
const fileName = `delete.txt`;
const filePath = path.join(__dirname, fileName);

console.log(`delete a ${fileName} file`);

fs.unlink(fileName, (err) => {
  if (err) return console.error(err);

  console.log(`file deleted successfully.`);
});
