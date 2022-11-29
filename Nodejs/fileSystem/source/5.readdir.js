const fs = require("fs");
const dirName = "newFolder";
const path = require("path");
const dirPath = path.join(__dirname, dirName);

console.log(`readding directory`);

fs.readdir(dirPath, (err, files) => {
  if (err) throw err;

  for (const key in files) {
    console.log(files[key]);
  }
});
