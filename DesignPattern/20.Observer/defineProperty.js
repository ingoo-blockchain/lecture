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
