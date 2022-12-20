const fs = require("fs");

myArr = [];
for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    var arr = "";
    mul = (i + 1) * (j + 1);
    arr = `${i + 1} * ${j + 1} = ${mul}`;
    myArr += arr + "";
    myArr += "\n";
  } // end of j
  myArr += "\n";
} // end of i
// console.log(myArr);

fs.writeFile("vertical_timstable.txt", myArr, function (err) {
  if (err) return console.error(err);

  console.log("data written");

  console.log("read file");
  fs.readFile("vertical_timstable.txt", (err, data) => {
    if (err) {
      return console.error(err);
    }
    console.log("vertical_timstable : \n" + data.toString());
  });
});
