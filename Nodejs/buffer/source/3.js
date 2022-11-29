const buf = Buffer.from("abcd");

for (let i = 0; i < buf.length; i++) {
  console.log(buf[i]);
  buf[i] = buf[i] + 1;
}

console.log(buf.toString());
