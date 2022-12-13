let fs = require("fs");
let srcstat;
let targetstat;

console.log("going to get file info!!!");
fs.stat("./src/level.md", function (err, stats) {
  if (err) {
    return console.error(err);
  }
  srcstat = stats;
  console.log(stats);
  console.log("got file info successfully!!");
});
console.log("going to get file info!!!");
fs.stat("./target/level.md", function (err, stats) {
  if (err) {
    return console.error(err);
  }
  console.log(stats);
  targetstat = stats;
  console.log("got file info successfully!!");
});

console.log("targetstat", targetstat);
