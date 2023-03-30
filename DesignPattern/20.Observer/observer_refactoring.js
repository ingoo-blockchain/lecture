class Issuer {
    #state
    #observers

    constructor(state) {
        this.#state = state
        this.#observers = new Set()
        for (const key in this.#state) {
            Object.defineProperty(this.#state, key, {
                get: () => this.#state[key],
                // if (this.#currentObserver) this.addSub(this.#currentObserver)
                set: (value) => {
                    console.log(value)
                    this.#state[key] = value
                    for (const fn of this.#observers) fn()
                },
            })
        }

        // return this.#state
    }

    // observe(fn) {
    //     this.#currentObserver = fn
    //     fn()
    //     this.#currentObserver = null
    // }

    setState(newState) {
        this.#state = { ...this.#state, ...newState }
        this.notify()
    }

    subscribe(subscriber) {
        this.#observers.add(subscriber)
    }

    unsubscribe(fn) {
        this.#observers.delete(fn)
    }

    notify() {
        console.log(this.#observers)
        this.#observers.forEach((fn) => fn())
    }
}

class Subscriber {}

const Store = new Issuer({ a: 10, b: 20 })

// Store.notify()
// console.log(Store)

// Store.observe(() => console.log(`a = ${Store.a}`))
Store.subscribe(() => console.log(`a = ${Store.a}`))
console.log(Store)
// Store.notify()
