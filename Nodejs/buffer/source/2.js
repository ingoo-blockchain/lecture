const data = {
  name: "ingoo", // 한글을 썻을때 달라지는 이유..
  age: 32,
};

console.log(data);

const dataString = JSON.stringify(data);
console.log(dataString);
console.log(dataString.length);

//incoding...
const buf = Buffer.from(dataString); // 기본은 utf-8 인코딩됨.

console.log(buf);
console.log(buf.length);
console.log(buf.toJSON());

//decoding..
console.log(buf.toString());
