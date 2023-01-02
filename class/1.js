class Person {
    constructor() {
        this.name = 'ingoo'
        this.age = 32
    }

    static getName() {
        console.log(this)
    }

    getName2() {
        console.log(this)
    }
}
