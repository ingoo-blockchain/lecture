## Binary 파일(이미지, 오디오, 비디오 등)을 서빙하기

1. 서빙하고자 하는 파일의 MIME 타입 알아내기
   특정 경로로 접근하면 binary 파일인 이미지, 음성, 비디오를 서비스해보도록하겠습니다.

asset들은 서버 내에 저장되어 있는 것이라고 가정합니다.

당연히 asset의 용량 자체가 크면 한 번에 서빙하면 안되겠죠. 쪼개서 보내야 합니다. 나중에 해보고, 여기서는 단순히 서빙하는 내용만 다루겠습니다.

우선 content-type에 적절한 미디어 타입을 설정해주기 위해 mime 패키지를 이용하겠습니다.

패키지에 의존하지 않고 node.js에서 native하게 파일의 mime type을 알아내는 방법은 없는 듯합니다.

파일 시스템 관련 처리는 OS의 도움을 받아야하므로 child_process를 통해서 별도의 프로세스를 생성하여 shell 명령어로 해당 파일의 mime 타입을 알아내고 이를 읽어오는 방법이 있으나 이럴거면 그냥 패키지를 쓰는 것이 좋습니다.

```javascript
function getMimeFromPath(filePath) {
  const execSync = require("child_process").execSync;
  const mimeType = execSync(
    'file --mime-type -b "' + filePath + '"'
  ).toString();
  return mimeType.trim();
}
```

버퍼 (Buffer)
기본적으로 자바스크립트는 이진 데이터(binary data)를 다룰 수 없다.

그런데 서버로 활용하는 노드에서는 TCP streams 이나 파일을 읽고 쓸 수 있어야 한다. 그래서 등장한 것이 buffer이다.

쉽게 말해 파일을 읽고 쓰는데 전송되는 이진 데이터를 buffer로 변환해서 활용하는 것이라고 이해하면 된다.

아래 코드는 node 내장 모듈인 fs의 readFile을 통해 파일을 읽고, 콜백으로 반환된 결과를 출력해 보면 파일 내용이 buffer로 변환한 것을 볼수 있다.

```javascript
const fs = require("fs");

// 파일 읽기
fs.readFile("./memo.txt", (err, data) => {
  if (err) {
    console.warn(err);
  }
  console.log(data); // <Buffer 72 65 61 64 20 6d 65 20 62 72 6f 21>
});
```

버퍼는 데이터를 조각(청크, chunk)내어 buffer에 채운 후 다 차면 buffer를 통째로 옮기고 새 buffer에 아직 옮기지 못한 데이터 조각을 다시 채운다.

이러한 데이터 조각을 buffer에 채우는 일을 한번쯤 들어본 버퍼링(buffering)이라고 부른다.

흔히 일상생활에서 영상이 버퍼링 중이라며 재생되지 않는 경우를 종종 경험했을텐데, buffer에 데이터를 채울 때까지 기다리는 버퍼링 작업을 말하는 것이다.

정리하자면 버퍼(buffer)란 일정한 크기로 모아두는 데이터 공간이며, 일정한 크기가 차면 한 번에 처리된다.

따라서 보통 파일보다 메모리가 커야된다.

**Buffer 메소드**

- Buffer.from(문자열): 문자열을 버퍼로 변경
- Buffer.toString(버퍼): 버퍼를 다시 문자열로 변경, hex나 base64를 인자로 넣으면 인코딩으로도 변환 가능
- Buffer.concat(배열): 배열 안에 든 버퍼들을 하나로 합침
- Buffer.alloc(바이트): 빈 버퍼를 생성, 바이트를 인자로 지정하면 해당 크기의 버퍼가 생성

```javascript
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
```

## Stream

스트림(stream)이란 데이터의 흐름을 말한다.

일상생활에서 한번쯤 들어본 스트리밍(streaming)이 일정한 크기의 데이터를 지속적으로 전달하는 작업을 일컫는다.

파일 다운 받을때 11%.. 35%.. 85% 로 다운 로딩이 되는데 이게 바로 스트림인 것이다.

이처럼 일정한 크기로 나눠서 여러 번에 걸쳐서 처리하는데, 버퍼(또는 청크)의 크기를 작게 만들어서 주기적으로 데이터를 전달하는 방식이다.

어렵게 이해할 필요없이, 메모리가 부족해 버퍼를 여러개 보내야 한다면 그게 스트림 이다.

스트림을 쓰는 이유는,

만일 100 byte 짜리 파일을 읽는다고 한다면, 버퍼로 읽을때 100 byte 만큼의 메모리 크기가 필요하다.
하지만 스트림으로 읽을때는 10byte만 있으면 충분하다. 왜냐하면 여러번 끊어서 읽기 때문에 메모리를 아낄수 있기 때문이다.
그래서 대용량 파일 서버를 구축할때는 스트림은 필수라고 봐도 무방하다.

### 파일 읽기 Stream

읽기 스트림을 만든다. highwatermark라는 옵션으로 버퍼의 크기를 정할 수 있다.

> highWatermark는 버퍼의 크기를 나타내며 객체 모드의 경우는 객체의 수를 나타낸다.

- 이벤트 리스너를 붙혀서 사용
- data, end, error 에벤트 활용

```js
const fs = require("fs");

// createReadStream은 한번에 64kbye를 읽는다. 이를 반복 스트림하는 동작
// highWaterMark 옵션을 바꿔준다. 기본은 64000바이트 이다. 16바이트로 바꿔준다.
const readStream = fs.createReadStream("./text.txt", { highWaterMark: 16 }); // 전체 파일을 지정한 크기의 chunk로 읽는다.
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
```
