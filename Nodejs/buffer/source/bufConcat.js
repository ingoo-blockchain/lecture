const buf1 = Buffer.from("a");
const buf2 = Buffer.from("b");
const buf3 = Buffer.from("c");

const arr = [buf1, buf2, buf3];

const buf = Buffer.concat(arr);
console.log(buf);
