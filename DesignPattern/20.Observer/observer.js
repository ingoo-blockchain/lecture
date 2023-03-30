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
