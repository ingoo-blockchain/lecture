const fs = require("fs");

// createReadStream은 한번에 64kbye를 읽는다. 이를 반복 스트림하는 동작
// highWaterMark 옵션을 바꿔준다. 기본은 64000바이트 이다. 16바이트로 바꿔준다.
const readStream = fs.createReadStream("./README.md", { highWaterMark: 16 }); // 전체 파일을 지정한 크기의 chunk로 읽는다.
const data = [];

// chunck크기 만큼 읽을 때 마다 이벤트를 발생시킨다. 파일이 크면 여러번 발생됨
readStream.on("data", (chunck) => {
  data.push(chunck);
  console.log("data : ", chunck, chunck.length);
});

// chunck읽기가 다 끝마친 경우
readStream.on("end", () => {
  console.log("end :", Buffer.concat(data).toString()); // chunck로 나뉘어진 버퍼 데이터들을 합친다.
});

// stream도 비동기라, 비동기들은 항상 에러 처리를 직접 정의해 줘야 한다.
readStream.on("error", (err) => {
  console.log("error : ", err);
});
