const buffer = Buffer.from("저를 버퍼로 바꿔보세요"); // 스트링을 버퍼로 변환

console.log("from() : ", buffer); // 버퍼 2진수를 16진수로 표현
console.log("length : ", buffer.length); // 32바이트
console.log("toString() : ", buffer.toString());

// 데이터를 조각조각 내서 보내고, 이를 하나하나 받아서 합침
const array = [
  Buffer.from("띄엄 "),
  Buffer.from("띄엄 "),
  Buffer.from("띄어쓰기"),
];
const buffer2 = Buffer.concat(array); // 버퍼 합치기
console.log("concat() : ", buffer2.toString());

// (인수)바이트 크기의 빈 버퍼를 생성
const buffer3 = Buffer.alloc(5); // 5바이트
console.log("alloc() : ", buffer3);
