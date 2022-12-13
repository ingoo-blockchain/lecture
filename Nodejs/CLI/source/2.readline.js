const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("프로그래밍 재밌습니까 ? (y/n)", (answer) => {
  if (answer === "y") {
    console.log("재밌군요?");
  } else if (answer === "n") {
    console.log("좀더 공부하면 재밌어짐");
  } else {
    console.log("이걸 못본다고 ? ^^");
  }

  rl.close();
});
