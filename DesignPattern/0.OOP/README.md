# OOP

## 캡슐화 (Encapsulation)

### 정의

객체의 필드, 메서드를 하나로 묶고, 실제 구현 내용을 감추는 것 **(정보은닉)**을 의미한다.
외부 객체는 객체 내부의 구조를 알지 못하며 객체가 노출해서 제공하는 필드와 메소드만 이용할
수 있다. 필드와 메소드를 캡슐화 하여 보호하는 이유는 **외부의 잘못된 사용으로 인해 객체가 손상되지 않도록 하는데 있다.**

### 요구사항 변경에 대처하는 고전적인 설계 원리

응집도 (cohesion)

-   Class 나 Module 안의 요소들이 얼마나 밀접하게 관련되어 있는지를 나타냄

결합도 (coupling)

-   어떤 기능을 실행하는 데 다른 클래스나 모듈들에 얼마나 의존적인지를 나타냄

캘슐화는 특히 낮은 결합도를 유지할 수 있도록 해주는 객체지향 설계 원리다.

소프트웨어는 결함이 많을수록 문제가 발생하므로 정보 은닉을 사용한다. 한 클래스가
변경이 발생하면 변경된 클래스의 비밀에 의존하는 다른 클래스들도 변경해야 할 가능성이
커지므로 캡슐화를 사용하여 데이터 구조에 따른 코드의 수정 범위를 캡슐 범위로 한정할 수 있다.

### 구현 예시

```js
class ArrayStack {
    top
    itemArray
    stackSize

    constructor(stackSize) {
        /*...*/
        this.stackSize = stackSize
        this.itemArray = new Array(stackSize)
        this.top = 0
    }

    isEmpty() {
        /*...*/
    }
    isFull() {
        /*...*/
    }
    push(item) {
        /*...*/
    }
    pop() {
        /*...*/
    }
    peek() {
        /*...*/
    }
}

class Main {
    static start() {
        const st = new ArrayStack(10)
        st.itemArray[++st.top] = 20 // pop, push method를 이용하지 않고 직접 배열에 저장
        console.log(st.itemArray[st.top])
    }
}
```
