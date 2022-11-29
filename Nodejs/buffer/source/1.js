const buf1 = Buffer.alloc(10); // Size가 10인 버퍼를 만듭니다 (10 Byte)
const buf2 = Buffer.from("Buffer really rocks"); // Buffer에 `Hello Buffer` 라는 데이터를 담습니다.

// 버퍼 내용을 확인해봅시다.

console.log(buf1.toJSON());
console.log(buf2.toJSON());
console.log(buf1.length);
console.log(buf2.length);

// 빈공간 버퍼에 내용넣기
buf1.write("Buffer really rocks");

// 버퍼를 Decoding 합니다.
console.log(buf1.toJSON());
console.log(buf1.toString());
