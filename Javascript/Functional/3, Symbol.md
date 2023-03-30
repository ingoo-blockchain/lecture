# Symbol



**Symbol**은 **ES6** 에서 추가된 **"원시형"** 데이터 타입입니다.

```javascript
Symbol
// console.dir(Symbol) 통해 내부 속성 확인해보기

Symbol.iterator
```



Symbol (이하 심볼) 은 특정 객체의 `Key` 로 사용 될 수 있습니다. 

```javascript
const arr = [1,2,3]
console.log(arr[Symbol.iterator]) // ƒ values() { [native code] }
```



이런 형태로 출력해보니,  `values` 라는  함수가 출력되는 것을 확인 할 수 있습니다. 



우리는 이런 values 라는 함수를 없애 보도록 하겠습니다.

```javascript
arr[Symbol.iterator] = null
console.log(arr[Symbol.iterator]) // null
```



이번엔 `arr[Symbol.iterator]` 라는 값이 null 로 재할당을 했습니다. 

이후 한번 `for of` 문으로 순회를 돌려보도록 하겠습니다.



```javascript
for(const a of arr) console.log(a) 
// Uncaught TypeError: arr is not iterable at <anonymous>:1:16
```



내용을 살펴보면, arr 라는 값은 iterable 이 아니다 라고 말하고 있습니다. 



그렇다는 것은 `for of` 가 작동되는 값들은 전부 `iterable` 이라는 뜻이겠죠 ? 

> Array, Set, Map 은 **iterable(이터러블)** 이라는 뜻입니다.



여기까지 내용을 정리하자면 



- **ES5 Loop**  와 **ES6 Loop** 의 차이점은 존재한다 
  - 설탕문법이 아니라는 뜻입니다.
- **ES6 Loop** 를 사용 할려면 `Symbol.iterator` 가 필요하다.
- **Array**, **Set**, **Map** 은 *iterable* 이다.









