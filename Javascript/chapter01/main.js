function Counter(type) {
  let count = 0;
  function increment() {
    count++;
    return count;
  }
  function decrement() {
    count--;
    return count;
  }

  return type === "increment" ? increment : decrement;
}

const increment = Counter("increment");
const decrement = Counter();

increment();
increment();
decrement();
const result = increment();
console.log(result);
