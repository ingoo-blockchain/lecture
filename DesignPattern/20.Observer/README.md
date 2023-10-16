# Javascript Observer

_Observer 패턴_ 은 객체가 이벤트를 구독하고, 이벤트를 발생할 때 알림을 받는 구독모델을
제공합니다. 이 패턴은 `Javascript` 를 포함한 이벤트 기반 프로그래밍의 초석 입니다.
_Observer 패턴_ 은 좋은 객체지향 설계를 용이하게 하고 느슨한 결합을 촉진합니다.

JavaScript의 이벤트 및 이벤트 처리기 패러다임은 관찰자 디자인 패턴의 표현입니다. Observer 패턴의 또 다른 이름은 Publication/Subscription의 줄임말인 Pub/Sub입니다.

```js
class 발행기관 {
    #state
    #observers = new Set()

    constructor(state) {
        this.#state = state
        Object.keys(state).forEach((key) =>
            Object.defineProperty(this, key, {
                get: () => this.#state[key],
            }),
        )
    }

    내부에_변화가_생김(newState) {
        this.#state = { ...this.#state, ...newState }
        this.구독자에게_알림()
    }

    구독자_등록(subscriber) {
        this.#observers.add(subscriber)
    }

    구독자에게_알림() {
        this.#observers.forEach((fn) => fn())
    }
}

class 구독자 {
    #fn

    constructor(발행기관에_변화가_생길_때_하는_일) {
        this.#fn = 발행기관에_변화가_생길_때_하는_일
    }

    구독(publisher) {
        publisher.구독자_등록(this.#fn)
    }
}

const Store = new 발행기관({
    a: 10,
    b: 20,
})

const 덧셈 = new 구독자(() => console.log(`a + b = ${Store.a + Store.b}`))
const 곱셈 = new 구독자(() => console.log(`a * b = ${Store.a * Store.b}`))

덧셈.구독(Store)
곱셈.구독(Store)

Store.구독자에게_알림()

Store.내부에_변화가_생김({ a: 100, b: 200 })
```

이 코드의 문제점이 있다.

-   지금 작성한 코드는 쉽게 말해서 2명의 구독자가 1개의 신문사(혹은 잡지) 를 구독하고 있는 상황이다.
-   그런데 만약 `10명의 구독자` 가 `100개의 신문사(혹은 잡지)` 를 구독한다고 했을 경우, 구독 관련 코드가 기하급수적으로 늘어날 것이다.

## defineProperty

```js
let a = 10
const state = {}

Object.defineProperty(state, 'a', {
    get() {
        console.log(`현재 a 값은 ${a} 입니다.`)
        return a
    },
    set(value) {
        a = value
        console.log(`변경된 a의 값은 ${a} 입니다.`)
    },
})

console.log(`state.a = ${state.a}`)
state.a = 100
```

-   `Object.defineProperty(object, prop, descriptor)`
    -   `object` : 속성을 정의할 객체
    -   `prop` : 새로 정의하거나 수정하려는 속성의 이름 또는 Symbol
    -   `descriptor` : 새로 정의하거나 수정하려는 속성을 기술하는 객체
