const fs = require("fs");

console.log("= 가로 출력=");
var arr = [];
for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    mul = (i + 1) * (j + 1);
    if (j == 8) {
      arr += `${i + 1}*${j + 1}=${mul}`;
    } else {
      arr += `${i + 1}*${j + 1}=${mul}_`;
    }
  } // end of j
  arr += "\n";
} // end of i
// console.log(arr);

fs.writeFile("horizontal_timstable.txt", arr, function (err) {
  if (err) return console.error(err);

  console.log("data written");

  console.log("read file");
  fs.readFile("horizontal_timstable.txt", (err, data) => {
    if (err) {
      return console.error(err);
    }
    console.log("horizontal_timstable : \n" + data.toString());
  });
});
