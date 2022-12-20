const EventEmitter = require("events");

const myEvent = new EventEmitter();

myEvent.addListener("event1", () => {
  console.log(`이벤트 1`);
});

myEvent.on("event2", () => {
  console.log("이벤트 2");
});

myEvent.on(`event2`, () => {
  console.log(`이벤트 2 추가`);
});

myEvent.once(`event3`, () => {
  console.log(`이벤트 3`);
});

myEvent.emit("event1");
myEvent.emit("event2"); // 콘솔 2번찍힘
myEvent.emit("event2"); // 콘솔 2번찍힘
myEvent.emit("event3"); // 이벤트호출
myEvent.emit("event3"); // 실행안됨

myEvent.on("event4", () => {
  console.log("이벤트 4");
});
myEvent.emit("event4"); // 실행

myEvent.removeAllListeners("event4"); // 이벤트 제거
myEvent.emit("event4"); // 실행안됨

const listner = () => {
  console.log("이벤트 5");
};

myEvent.on("evnet5", listner);
myEvent.removeListener("event5", listner); // 해당 이벤트 지우기 (마치)
myEvent.emit("event5");

console.log(myEvent.listenerCount("event2")); // 2 event2 이벤트를 몇번 실행했는가?
