console.log("= 세로 출력=");
for (let i = 0; i < 9; i++) {
  myArr = [];
  for (let j = 0; j < 9; j++) {
    var arr = "";
    mul = (i + 1) * (j + 1);
    arr = `${i + 1} * ${j + 1} = ${mul}`;
    myArr += arr + "<br>";
    console.log(arr);
  } // end of j
  console.log("\n");
} // end of i

console.log("= 가로 출력=");

for (let i = 0; i < 9; i++) {
  var arr = [];
  for (let j = 0; j < 9; j++) {
    // if(j>0){                             //시간복잡도 slice < if문??
    // arr += '_'
    // }
    mul = (i + 1) * (j + 1);
    arr += `${i + 1}*${j + 1}=${mul} `;
  } // end of j
  console.log(arr.slice(0, -1));
} // end of i
