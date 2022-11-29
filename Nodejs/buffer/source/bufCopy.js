const buf1 = Buffer.from("web7722@gmail.com");
const buf2 = Buffer.from("helloworld");

// buf1 에서부터 2번째 인덱스에 Hello world 넣음
// 1 : 넣을 데이터
// 2 : 넣을 위치
// buf1.write("Hello world", 2);
// console.log(buf1.toString());

buf2.copy(buf1, 0);
console.log(buf1.toString());
